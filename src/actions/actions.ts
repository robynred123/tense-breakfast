import axios from 'axios';
import { slice } from '../reducers/reducer';
import { AppDispatch } from '../store';
import moment from 'moment';
import {
  AppointmentType,
  Availabilities,
  AvailabilityData,
  DateRange,
  FilterOptions,
  Specialisms,
  TherapistInfo,
} from '../types';
import { filterByDate, filterHelper } from '../utils/filterHelpers';

const { setTherapists, setFilterOptions, setFilteredTherapists } = slice.actions;

type TherapistsResponse = {
  data: TherapistInfo[];
};

export const getTherapists = () => async (dispatch: AppDispatch) => {
  await axios
    .get('data/counsellor-mock.json')
    .then((response: TherapistsResponse) => {
      dispatch(setTherapists(response.data as TherapistInfo[]));
    })
    .catch((error: any) => console.log(error));
};

export const updateFilterOptions = (filterOptions: FilterOptions) => (dispatch: AppDispatch) => {
  const mappedFilterOptions: FilterOptions = {
    appointmentType: filterOptions.appointmentType,
    dateRange: filterOptions.dateRange,
    specialisms: filterOptions.specialisms,
  };
  return dispatch(setFilterOptions(mappedFilterOptions));
};

export const getAvailabilities = async () => {
  return await axios
    .get('data/availability-mock.json')
    .then(async (response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.log(error);
      return {};
    });
};

export const filterTherapists =
  (
    therapists: TherapistInfo[],
    appointmentTypes: AppointmentType[],
    dateRange: DateRange,
    specialisms: Specialisms[]
  ) =>
  async (dispatch: AppDispatch) => {
    const { start, end } = dateRange;
    // filters removed, return all therapists
    if (appointmentTypes.length === 0 && specialisms.length === 0 && start == null && end == null) {
      // if filters removed, return all therapists
      dispatch(setFilteredTherapists(therapists));
    } else {
      let filteredTherapists;
      if (start && end) {
        const data: Availabilities = await getAvailabilities();
        const availabilities = await filterByDate(therapists, data, start, end);
        filteredTherapists = filterHelper(availabilities, appointmentTypes, specialisms);
      } else {
        filteredTherapists = filterHelper(therapists, appointmentTypes, specialisms);
      }
      return filteredTherapists ? dispatch(setFilteredTherapists(filteredTherapists)) : null;
    }
  };

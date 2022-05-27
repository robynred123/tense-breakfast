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
import { filterHelper } from '../utils/filterHelpers';

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

const filterByDate = async (
  therapists: TherapistInfo[],
  response: Availabilities,
  start: string,
  end: string
) => {
  const availableTherapists: TherapistInfo[] = [];
  therapists.forEach((therapist) => {
    const therapistId = therapist.id;
    const dateTimeArray = response[therapistId];
    if (
      dateTimeArray.some((entry) => {
        const dateTime = entry.datetime;
        return moment(dateTime).isBetween(start, end);
      }) &&
      availableTherapists.includes(therapist) === false
    ) {
      availableTherapists.push(therapist);
    }
  });
  return availableTherapists;
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
        await axios
          .get('data/availability-mock.json')
          .then(async (response: any) => {
            const availabilities = await filterByDate(therapists, response.data, start, end);

            filteredTherapists = filterHelper(availabilities, appointmentTypes, specialisms);
          })
          .catch((error: any) => console.log(error));
      } else {
        filteredTherapists = filterHelper(therapists, appointmentTypes, specialisms);
      }
      return filteredTherapists ? dispatch(setFilteredTherapists(filteredTherapists)) : null;
    }
  };

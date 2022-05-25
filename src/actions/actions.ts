import axios from 'axios';
import { slice } from '../reducers/reducer';
import { AppDispatch } from '../store';
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

export const getAvailabilities = () => async () => {
  await axios
    .get('data/availability-mock.json')
    .then((response: any) => {
      return response.data as Availabilities;
    })
    .catch((error: any) => {
      console.log(error);
      return [];
    });
};

const mapTherapists = (therapists: TherapistInfo[], availableTimes: Availabilities) => {
  return therapists.forEach((therapist) => {
    return {
      ...therapist,
      availabilities: availableTimes[therapist.id] || [],
    };
  });
};

export const getTherapists = (therapists: TherapistInfo[]) => async (dispatch: AppDispatch) => {
  await axios
    .get('data/counsellor-mock.json')
    .then(async (response: TherapistsResponse) => {
      const availabilities = await getAvailabilities();
      const mappedTherapists: TherapistInfo[] = mapTherapists(therapists, availabilities);

      dispatch(setTherapists(mappedTherapists));
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
      filteredTherapists = filterHelper(therapists, appointmentTypes, specialisms);
      return filteredTherapists ? dispatch(setFilteredTherapists(filteredTherapists)) : null;
    }
  };

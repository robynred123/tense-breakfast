import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { slice } from '../reducers/reducer';
import { AppDispatch } from '../store';
import {
  AppointmentType,
  Availabilities,
  BookingOptions,
  DateRange,
  FilterOptions,
  Specialisms,
  TherapistInfo,
} from '../types';
import { filterByDate, filterHelper } from '../utils/filterHelpers';

const {
  setTherapists,
  setFilterOptions,
  setFilteredTherapists,
  setMobileFilter,
  clearFilterOptions,
  setError,
} = slice.actions;

type TherapistsResponse = {
  data: TherapistInfo[];
};

export const getTherapists = () => async (dispatch: AppDispatch) => {
  await axios
    .get('http://localhost:4000/therapists')
    .then((response: TherapistsResponse) => {
      dispatch(setTherapists(response.data as TherapistInfo[]));
    })
    .catch((error: any) => {
      return dispatch(setError('Unabled to get therapists, please refresh the app.'));
    });
};

export const updateFilterOptions =
  (filterOptions: FilterOptions) => async (dispatch: AppDispatch) => {
    const mappedFilterOptions: FilterOptions = {
      appointmentType: filterOptions.appointmentType,
      dateRange: filterOptions.dateRange,
      specialisms: filterOptions.specialisms,
    };
    return dispatch(setFilterOptions(mappedFilterOptions));
  };

export const getAvailabilities = async () => {
  let data: Availabilities = {};
  await axios
    .get('http://localhost:4000/availabilities')
    .then(async (response: any) => {
      return (data = response.data);
    })
    .catch((error: any) => {
      return {};
    });
  return data;
};

export const getAvailabilitiesById = async (therapistId: string) => {
  const availabilities: Availabilities = await getAvailabilities();
  if (availabilities !== {}) {
    return availabilities[therapistId];
  } else return [];
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
        // get available times and filter
        const data: Availabilities = await getAvailabilities();
        const availabilities = await filterByDate(therapists, data, start, end);
        filteredTherapists = filterHelper(availabilities, appointmentTypes, specialisms);
      } else {
        // else just filter
        filteredTherapists = filterHelper(therapists, appointmentTypes, specialisms);
      }
      return filteredTherapists ? dispatch(setFilteredTherapists(filteredTherapists)) : null;
    }
  };

export const changeMobileFilter = (value: boolean) => (dispatch: AppDispatch) => {
  return dispatch(setMobileFilter(value));
};

export const bookingRequest =
  (bookingOptions: BookingOptions, navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
    await axios
      .post('http://localhost:4000/bookingRequests', bookingOptions)
      .then((response) => {
        dispatch(clearFilterOptions());
        return navigate('/Success');
      })
      .catch((error) => {
        return dispatch(setError('Failure to submit request, please try again later'));
      });
  };

export const clearError = () => async (dispatch: AppDispatch) => {
  return dispatch(setError(null));
};

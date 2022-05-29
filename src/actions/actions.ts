import axios from 'axios';
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

const { setTherapists, setFilterOptions, setFilteredTherapists, setMobileFilter } = slice.actions;

type TherapistsResponse = {
  data: TherapistInfo[];
};

export const getTherapists = () => async (dispatch: AppDispatch) => {
  await axios
    .get('http://localhost:4000/therapists')
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
  let data: Availabilities = {};
  await axios
    .get('http://localhost:4000/availabilities')
    .then(async (response: any) => {
      return (data = response.data);
    })
    .catch((error: any) => {
      console.log(error);
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

export const bookingRequest = (bookingOptions: BookingOptions) => async (dispatch: AppDispatch) => {
  const data = bookingOptions;
  console.log(data);
  const res = await axios.post('http://localhost:4000/bookingRequests', data);
  console.log(res);
  /*const newFilterOptions: FilterOptions = {
        appointmentType: [],
        dateRange: {
          start: null,
          end: null,
        },
        specialisms: [],
      };
      return dispatch(setFilterOptions(newFilterOptions));*/
};

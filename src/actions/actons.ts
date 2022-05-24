import axios from 'axios';
import { slice } from '../reducers/reducer';
import { AppDispatch } from '../store';
import { AppointmentType, FilterOptions, Specialisms, TherapistInfo } from '../types';
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

export const filterTherapists =
  (therapists: TherapistInfo[], appointmentTypes: AppointmentType[], specialisms: Specialisms[]) =>
  async (dispatch: AppDispatch) => {
    if (appointmentTypes.length === 0 && specialisms.length === 0) {
      // if filters removed, return all therapists
      dispatch(setFilteredTherapists(therapists));
    } else {
      const filteredTherapists = filterHelper(therapists, appointmentTypes, specialisms);

      return dispatch(setFilteredTherapists(filteredTherapists));
    }
  };

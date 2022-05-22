import axios from 'axios';
import { slice } from '../reducers/reducer';
import { AppDispatch } from '../store';
import { AppointmentType, FilterOptions, TherapistInfo } from '../types';

const { setTherapists, setFilterOptions, setFilterAppointmentType } = slice.actions;

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
    appointmentType: filterOptions.appointmentType || [],
    appointmentMedium: filterOptions.appointmentMedium || [],
    specialisms: filterOptions.specialisms || [],
  };
  return dispatch(setFilterOptions(mappedFilterOptions));
};

export const updateFilterAppointmentType =
  (appointmentTypes: AppointmentType[]) => (dispatch: AppDispatch) => {
    return dispatch(setFilterAppointmentType(appointmentTypes));
  };

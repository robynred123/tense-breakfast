import axios from 'axios';
import { slice } from '../reducers/reducer';
import { AppDispatch } from '../store';
import { AppointmentType, FilterOptions, TherapistInfo } from '../types';

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
    appointmentType: filterOptions.appointmentType || [],
    appointmentMedium: filterOptions.appointmentMedium || [],
    specialisms: filterOptions.specialisms || [],
  };
  return dispatch(setFilterOptions(mappedFilterOptions));
};

export const filterTherapists =
  (therapists: TherapistInfo[], appointmentTypes: AppointmentType[]) => (dispatch: AppDispatch) => {
    if (appointmentTypes.length === 0) {
      // if filters removed, return all therapists
      dispatch(setFilteredTherapists(therapists));
    } else {
      // else if therpist appointment types include any appointment types, return therapist.
      const newTherapistsArray = therapists.filter((therapist) => {
        const therapistAppTypes = therapist.appointment_types;
        const returnTherapist = appointmentTypes.some((type) => therapistAppTypes.includes(type));
        if (returnTherapist) {
          return therapist;
        } else return null;
      });

      return dispatch(setFilteredTherapists(newTherapistsArray));
    }
  };

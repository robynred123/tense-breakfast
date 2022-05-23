import axios from 'axios';
import { slice } from '../reducers/reducer';
import { AppDispatch } from '../store';
import { AppointmentType, FilterOptions, Specialisms, TherapistInfo } from '../types';

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

const filterTypes = (therapists: TherapistInfo[], appointmentTypes: AppointmentType[]) => {
  // else if therpist appointment types include any appointment types, return therapist.
  const newArray: TherapistInfo[] = therapists.filter((therapist) => {
    const therapistAppTypes = therapist.appointment_types;
    const returnTherapist = appointmentTypes.some((type) => therapistAppTypes.includes(type));
    if (returnTherapist) {
      return therapist;
    }
  });
  return newArray || therapists;
};

const filterSpecialisms = (therapists: TherapistInfo[], specialisms: Specialisms[]) => {
  const newArray: TherapistInfo[] = therapists.filter((therapist) => {
    const therapistSpecialisms = therapist.specialisms;
    const returnTherapist = specialisms.some((specialism) =>
      therapistSpecialisms.includes(specialism)
    );
    if (returnTherapist) {
      return therapist;
    }
  });
  return newArray || therapists;
};

export const filterTherapists =
  (therapists: TherapistInfo[], appointmentTypes: AppointmentType[], specialisms: Specialisms[]) =>
  async (dispatch: AppDispatch) => {
    if (appointmentTypes.length === 0 && specialisms.length === 0) {
      // if filters removed, return all therapists
      dispatch(setFilteredTherapists(therapists));
    } else {
      const filteredByType = await filterTypes(therapists, appointmentTypes);
      console.log('Type', filteredByType);
      //this ain't working
      const filteredBySpecialisms = filterSpecialisms(filteredByType, specialisms);
      console.log('specialism', filteredBySpecialisms);

      return dispatch(setFilteredTherapists(filteredBySpecialisms));
    }
  };

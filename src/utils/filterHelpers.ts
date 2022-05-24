/* eslint-disable array-callback-return */
import { AppointmentType, Specialisms, TherapistInfo } from '../types';

export const filterHelper = (
  therapists: TherapistInfo[],
  appointmentTypes: AppointmentType[],
  specialisms: Specialisms[]
) => {
  const filterByType: TherapistInfo[] = therapists.filter((therapist) => {
    const therapistAppTypes = therapist.appointment_types;
    const returnTherapistByType = appointmentTypes.every((type) =>
      therapistAppTypes.includes(type)
    );
    if (returnTherapistByType) {
      return therapist;
    }
  });

  const filteredBySpecialisms = filterSpecialisms(filterByType, specialisms);
  return filteredBySpecialisms;
};

export const filterSpecialisms = (therapists: TherapistInfo[], specialisms: Specialisms[]) => {
  const filterBySpecialisms: TherapistInfo[] = therapists.filter((therapist) => {
    const therapistSpecialisms = therapist.specialisms;
    const returnTherapistBySpecial = specialisms.every((type) =>
      therapistSpecialisms.includes(type)
    );
    if (returnTherapistBySpecial) {
      return therapist;
    }
  });
  return filterBySpecialisms;
};

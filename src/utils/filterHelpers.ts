/* eslint-disable array-callback-return */
import moment from 'moment';
import { AppointmentType, Availabilities, Specialisms, TherapistInfo } from '../types';

export const filterHelper = (
  therapists: TherapistInfo[],
  appointmentTypes: AppointmentType[],
  specialisms: Specialisms[]
) => {
  const filterByType: TherapistInfo[] = therapists.filter((therapist) => {
    //types
    const therapistAppTypes = therapist.appointment_types;
    const returnTherapistByType = appointmentTypes.every((type) =>
      therapistAppTypes.includes(type)
    );
    console.log(returnTherapistByType);

    //specialisms
    const therapistSpecialisms = therapist.specialisms;
    const returnTherapistBySpecial = specialisms.every((type) =>
      therapistSpecialisms.includes(type)
    );
    console.log(returnTherapistBySpecial);

    if (returnTherapistByType && returnTherapistBySpecial) {
      return therapist;
    }
  });

  return filterByType;
};

export const filterByDate = async (
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

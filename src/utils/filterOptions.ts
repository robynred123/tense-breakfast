import { AppointmentType } from '../types';

export const determineSelectedType = (
  value: AppointmentType,
  appointmentType: AppointmentType[]
) => {
  if (appointmentType.includes(value)) {
    return 'green';
  } else return 'grey';
};

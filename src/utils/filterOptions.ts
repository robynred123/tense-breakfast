import { AppointmentType } from '../types';

export const updateOptionsArray = (value: AppointmentType, optionsArray: AppointmentType[]) => {
  if (optionsArray.includes(value)) {
    const newArray = optionsArray.filter((type) => type !== value);
    return newArray;
  } else return [...optionsArray, value];
};

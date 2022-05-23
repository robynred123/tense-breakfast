import { AppointmentType, Specialisms } from '../types';

export const updateTypesArray = (value: AppointmentType, optionsArray: AppointmentType[]) => {
  if (optionsArray.includes(value)) {
    const newArray = optionsArray.filter((type) => type !== value);
    return newArray;
  } else return [...optionsArray, value];
};

export const updateSpecialismsArray = (value: Specialisms, optionsArray: Specialisms[]) => {
  if (optionsArray.includes(value)) {
    const newArray = optionsArray.filter((type) => type !== value);
    return newArray;
  } else return [...optionsArray, value];
};

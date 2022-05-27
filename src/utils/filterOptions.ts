import { AppointmentType, DateRange, Specialisms, Type, FilterOptions } from '../types';

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

export const handleFilters = (
  value: AppointmentType | Specialisms | DateRange,
  type: Type,
  appointmentType: AppointmentType[],
  dateRange: DateRange,
  specialisms: Specialisms[]
) => {
  const newOptions: FilterOptions = {
    appointmentType: appointmentType,
    dateRange: {
      start: dateRange.start,
      end: dateRange.end,
    },
    specialisms: specialisms,
  };
  switch (type) {
    case 'type':
      return {
        ...newOptions,
        appointmentType: updateTypesArray(value as AppointmentType, appointmentType),
      };
    case 'specialism':
      return {
        ...newOptions,
        specialisms: updateSpecialismsArray(value as Specialisms, specialisms),
      };
    case 'date':
      return {
        ...newOptions,
        dateRange: value as DateRange,
      };
    default:
      return newOptions;
  }
};

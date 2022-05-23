export interface ReducerState {
  therapists: TherapistInfo[];
  filteredTherapists: TherapistInfo[];
  filterOptions: FilterOptions;
}

export interface TherapistInfo {
  id: string;
  firstName: string;
  lastName: string;
  appointment_types: AppointmentType[];
  appointment_mediums: AppointmentMedium[];
  specialisms: Specialisms[];
}

export type AppointmentType = 'one_off' | 'consultation';
export type AppointmentMedium = 'phone' | 'video';
export type Specialisms = string;

export type FilterOptions = {
  appointmentType: AppointmentType[];
  appointmentMedium: AppointmentMedium[];
  specialisms: Specialisms[];
};

export interface ReducerState {
  therapists: TherapistInfo[];
  filterOptions: FilterOptions;
}

export interface TherapistInfo {
  id: string;
  firstName: string;
  lastName: string;
  appointment_types: string[];
  appointment_mediums: string[];
  specialisms: string[];
}

export type AppointmentType = 'one-off' | 'consultation';
export type AppointmentMedium = 'phone' | 'video';
export type Specialisms = string;

export type FilterOptions = {
  appointmentType: AppointmentType[];
  appointmentMedium: AppointmentMedium[];
  specialisms: Specialisms[];
};

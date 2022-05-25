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
  availableAppointments?: Date[];
}

export interface DateRange {
  start: string | null;
  end: string | null;
}

export interface AvailabilityData {
  id: string;
  datetime: string;
}

export interface Availabilities {
  [therapistId: string]: AvailabilityData[];
}

export type AppointmentType = 'one_off' | 'consultation';
export type AppointmentMedium = 'phone' | 'video';
export type Specialisms = string;

export type FilterOptions = {
  appointmentType: AppointmentType[];
  dateRange: DateRange;
  specialisms: Specialisms[];
};

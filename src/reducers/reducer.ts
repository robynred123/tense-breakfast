import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TherapistInfo, FilterOptions, ReducerState } from '../types';

const initialState: ReducerState = {
  therapists: [],
  filteredTherapists: [],
  filterOptions: {
    appointmentType: [],
    appointmentMedium: [],
    specialisms: [],
  },
};

export const slice = createSlice({
  name: 'Therapists',
  initialState,
  reducers: {
    setTherapists: (state, action: PayloadAction<TherapistInfo[]>) => {
      state.therapists = action.payload;
      state.filteredTherapists = action.payload;
    },
    setFilterOptions: (state, action: PayloadAction<FilterOptions>) => {
      const { appointmentType, appointmentMedium, specialisms } = action.payload;
      state.filterOptions = {
        appointmentType: appointmentType,
        appointmentMedium: appointmentMedium,
        specialisms: specialisms,
      };
    },
    setFilteredTherapists: (state, action: PayloadAction<TherapistInfo[]>) => {
      state.filteredTherapists = action.payload;
    },
  },
});

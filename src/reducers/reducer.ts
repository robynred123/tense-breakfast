import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TherapistInfo, FilterOptions, ReducerState } from '../types';

const initialState: ReducerState = {
  therapists: [],
  filteredTherapists: [],
  filterOptions: {
    appointmentType: [],
    dateRange: {
      start: null,
      end: null,
    },
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
      const { appointmentType, dateRange, specialisms } = action.payload;
      state.filterOptions = {
        appointmentType: appointmentType,
        dateRange: {
          start: dateRange.start,
          end: dateRange.end,
        },
        specialisms: specialisms,
      };
    },
    setFilteredTherapists: (state, action: PayloadAction<TherapistInfo[]>) => {
      state.filteredTherapists = action.payload;
    },
  },
});

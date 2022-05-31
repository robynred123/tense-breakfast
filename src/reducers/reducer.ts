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
  mobileFilter: false,
  error: null,
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
    clearFilterOptions: (state, action: PayloadAction) => {
      state.filterOptions = initialState.filterOptions;
    },
    setFilteredTherapists: (state, action: PayloadAction<TherapistInfo[]>) => {
      state.filteredTherapists = action.payload;
    },
    setMobileFilter: (state, action: PayloadAction<boolean>) => {
      state.mobileFilter = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TherapistInfo } from '../types';

interface ReducerState {
  therapists: TherapistInfo[];
}

const initialState: ReducerState = {
  therapists: [],
};

export const slice = createSlice({
  name: 'Therapists',
  initialState,
  reducers: {
    setTherapists: (state, action: PayloadAction<TherapistInfo[]>) => {
      state.therapists = action.payload;
    },
  },
});

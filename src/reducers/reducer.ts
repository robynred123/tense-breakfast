import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReducerState {
  status: string;
}

const initialState: ReducerState = {
  status: 'no calls!',
};

export const slice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

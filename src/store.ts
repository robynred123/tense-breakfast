import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { slice } from './reducers/reducer';

const store = configureStore({
  reducer: {
    one: slice.reducer,
  },
});

//state type
export type RootState = ReturnType<typeof store.getState>;

//dispatch type and hook
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

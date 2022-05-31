import configureStore from 'redux-mock-store';
import { Store, AnyAction } from 'redux';
import { FilterOptions, ReducerState } from '../types/index';

export const filterOptions: FilterOptions = {
  appointmentType: [],
  dateRange: {
    start: null,
    end: null,
  },
  specialisms: [],
};
export const initialState: ReducerState = {
  therapists: [],
  filteredTherapists: [],
  filterOptions,
  mobileFilter: false,
  error: null,
};

export const mockStore = (initialState: ReducerState) => {
  const mockStore = configureStore();
  let store: Store<any, AnyAction>;
  store = mockStore({ one: initialState });
  return store;
};

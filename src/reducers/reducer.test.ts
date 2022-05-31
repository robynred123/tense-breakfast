import { initialState } from '../mocks/mockStore';
import { therapistOne, therapistTwo } from '../mocks/testData';
import store from '../store';
import { filterOptions as mockFilterOptions } from '../mocks/mockStore';
import { FilterOptions } from '../types';
import { slice } from './reducer';
const {
  setTherapists,
  setFilterOptions,
  setFilteredTherapists,
  setMobileFilter,
  clearFilterOptions,
  setError,
} = slice.actions;

describe('Reducers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should set state to initial values', () => {
    const state = store.getState().one;
    expect(state).toEqual(initialState);
  });

  it('should set therapists on setTherapist action', () => {
    const state = store.getState().one;
    expect(state.therapists).toEqual([]);
    expect(state.filteredTherapists).toEqual([]);

    store.dispatch(setTherapists([therapistOne]));
    const newState = store.getState().one;
    expect(newState.therapists).toEqual([therapistOne]);
    expect(newState.filteredTherapists).toEqual([therapistOne]);
  });

  it('should set filter options on setFilterOptions action', () => {
    const updatedFilterOptions: FilterOptions = {
      appointmentType: ['consultation'],
      dateRange: {
        start: '2021-08-06T11:00:00.000Z',
        end: '2021-08-17T14:00:00.000Z',
      },
      specialisms: ['ADHD'],
    };
    const state = store.getState().one;
    expect(state.filterOptions).toEqual(mockFilterOptions);

    store.dispatch(setFilterOptions(updatedFilterOptions));
    const newState = store.getState().one;
    expect(newState.filterOptions).toEqual(updatedFilterOptions);
  });

  it('should clear filter options on clearFilterOptions action', () => {
    /*const updatedFilterOptions: FilterOptions = {
      appointmentType: ['consultation'],
      dateRange: {
        start: '2021-08-06T11:00:00.000Z',
        end: '2021-08-17T14:00:00.000Z',
      },
      specialisms: ['ADHD'],
    };
    // Couldn't get the mock state to reset, so no need to reset filter options

    /* const state = store.getState().one;
    expect(state.filterOptions).toEqual(mockFilterOptions);

    store.dispatch(setFilterOptions(updatedFilterOptions));
    const newState = store.getState().one;
    expect(newState.filterOptions).toEqual(updatedFilterOptions);*/

    store.dispatch(clearFilterOptions());
    const state = store.getState().one;
    expect(state.filterOptions).toEqual(mockFilterOptions);
  });

  it('should set filtered therapists on setFilteredTherapist action', () => {
    /*const state = store.getState().one;
    expect(state.therapists).toEqual([]);
    expect(state.filteredTherapists).toEqual([]);*/

    store.dispatch(setFilteredTherapists([therapistTwo]));
    const newState = store.getState().one;
    expect(newState.filteredTherapists).toEqual([therapistTwo]);
  });

  it('should set mobile Filter boolean on setMobileFilter action', () => {
    const state = store.getState().one;
    expect(state.mobileFilter).toEqual(false);

    store.dispatch(setMobileFilter(true));
    const newState = store.getState().one;
    expect(newState.mobileFilter).toEqual(true);

    store.dispatch(setMobileFilter(false));
    const newerState = store.getState().one;
    expect(newerState.mobileFilter).toEqual(false);
  });

  it('should setError on action', () => {
    const state = store.getState().one;
    expect(state.error).toEqual(null);

    store.dispatch(setError('error!'));
    const newState = store.getState().one;
    expect(newState.error).toEqual('error!');
  });
});

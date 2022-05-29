/* eslint-disable testing-library/await-async-query */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Store, AnyAction } from 'redux';
import { FilterOptions, ReducerState } from '../types';
import { Header } from './Header';

describe('<Header />', () => {
  const filterOptions: FilterOptions = {
    appointmentType: [],
    dateRange: {
      start: null,
      end: null,
    },
    specialisms: [],
  };
  const initialState: ReducerState = {
    therapists: [],
    filteredTherapists: [],
    filterOptions,
    mobileFilter: false,
  };
  const mockStore = configureStore();
  let store: Store<any, AnyAction>;
  store = mockStore({ one: initialState });

  beforeEach(() => {
    jest.clearAllMocks();
  });
  xit('Should render the header component successfully', () => {
    const view = renderer.create(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const image = view.root.findByType('img');
    expect(view.toJSON()).toMatchSnapshot();
    expect(image.props.src).toEqual('spill-logo.png');
  });
});

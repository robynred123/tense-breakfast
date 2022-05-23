/* eslint-disable testing-library/await-async-query */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { FilterMenu } from './FilterMenu';
import { FilterOptions, ReducerState } from '../types';
import { Store, AnyAction } from 'redux';

describe('<FilterMenu />', () => {
  const filterOptions: FilterOptions = {
    appointmentType: [],
    dateRange: {
      start: null,
      end: null,
    },
    specialisms: [],
  };
  const therapistSpecialisms = ['ADHD'];
  const initialState: ReducerState = { therapists: [], filteredTherapists: [], filterOptions };
  const mockStore = configureStore();
  let store: Store<any, AnyAction>;
  store = mockStore(initialState);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render the FilterMenu component successfully', () => {
    const view = renderer.create(
      <Provider store={store}>
        <FilterMenu filterOptions={filterOptions} therapistSpecialisms={therapistSpecialisms} />
      </Provider>
    );
    expect(view.toJSON()).toMatchSnapshot();
    expect(view.root.findByType('h5').props.children).toEqual('Filter Results');
    expect(view.root.findByType('h6').props.children).toEqual('Appointment Type');
    const buttons = view.root.findAllByType('button');
    expect(buttons[0].props.children).toEqual([[undefined, 'One_Off', undefined], null]);
    expect(buttons[1].props.children).toEqual([[undefined, 'Consultation', undefined], null]);
  });
});

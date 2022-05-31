/* eslint-disable testing-library/await-async-query */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import * as reactRedux from '../store';
import { mockStore, initialState } from '../mocks/mockStore';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { Index } from './index';
import { therapistOne } from '../mocks/testData';

describe('<Index />', () => {
  let mockUseLocationValue = {
    pathname: '/',
    key: '',
    search: '',
    hash: '',
    state: {},
  };

  const history = createBrowserHistory();
  let useDispatchSpy: any;
  let mockUseDispatch = jest.fn();

  beforeEach(() => {
    useDispatchSpy = jest.spyOn(reactRedux, 'useAppDispatch');
    useDispatchSpy.mockReturnValue(mockUseDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render the Index page successfully', () => {
    const store = mockStore(initialState);
    const view = renderer.create(
      <Provider store={store}>
        <Router navigator={history} location={mockUseLocationValue}>
          <Index />
        </Router>
      </Provider>
    );

    expect(view.toJSON()).toMatchSnapshot();
    expect(useDispatchSpy).toHaveBeenCalledTimes(2);

    expect(view.root.findByType('h3').props.children).toEqual(
      'No Therapists Found Matching Selected Filters'
    );

    // filter menu tested in filter menu tests
    expect(view.root.findByType('h4').props.children).toEqual('Filter Results');
  });

  it('Should render the Index page successfully with a therapist', () => {
    const store = mockStore({
      ...initialState,
      therapists: [therapistOne],
      filteredTherapists: [therapistOne],
    });
    const view = renderer.create(
      <Provider store={store}>
        <Router navigator={history} location={mockUseLocationValue}>
          <Index />
        </Router>
      </Provider>
    );

    expect(view.toJSON()).toMatchSnapshot();

    // therapist card tested in therapist card tests
    expect(view.root.findAllByType('svg')[0].props['data-testid']).toEqual('AccountCircleIcon');
    expect(view.root.findAllByType('h4')[0].props.children).toEqual(['Albert', ' ', 'Einstein']);
    expect(view.root.findAllByType('h4')[1].props.children).toEqual('Filter Results');
  });

  it('Should render the Index page successfully with only filter menu', () => {
    const store = mockStore({
      ...initialState,
      therapists: [therapistOne],
      filteredTherapists: [therapistOne],
      mobileFilter: true,
    });
    const view = renderer.create(
      <Provider store={store}>
        <Router navigator={history} location={mockUseLocationValue}>
          <Index />
        </Router>
      </Provider>
    );

    expect(view.toJSON()).toMatchSnapshot();

    expect(view.root.findByType('h4').props.children).toEqual('Filter Results');
  });
});

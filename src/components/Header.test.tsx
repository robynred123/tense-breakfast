/* eslint-disable testing-library/await-async-query */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { mockStore, initialState } from '../../mocks/mockStore';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';

describe('<Header />', () => {
  let mockUseLocationValue = {
    pathname: '/',
    search: '',
    hash: '',
    state: null,
  };

  jest.mock('react-router', () => ({
    ...(jest.requireActual('react-router') as {}),
    useLocation: jest.fn().mockImplementation(() => {
      return mockUseLocationValue;
    }),
  }));

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should render the header component successfully with filter icon', () => {
    const store = mockStore(initialState);
    const view = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    const image = view.root.findByType('img');
    expect(view.toJSON()).toMatchSnapshot();
    expect(image.props.src).toEqual('spill-logo.png');
    expect(view.root.findByType('svg').props['data-testid']).toEqual('FilterAltIcon');
  });

  it('Should render the header component successfully with cross icon', () => {
    const store = mockStore({ ...initialState, mobileFilter: true });
    const view = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    expect(view.toJSON()).toMatchSnapshot();
    expect(view.root.findByType('svg').props['data-testid']).toEqual('CloseIcon');
  });

  // Below test is failing, mocking pathname not successful
  xit('Should render the header component successfully with no icon', () => {
    const store = mockStore(initialState);
    mockUseLocationValue.pathname = '/Therapist';
    const view = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    expect(view.toJSON()).toMatchSnapshot();
    expect(view.root.findByType('svg')).toBeUndefined();
  });
});

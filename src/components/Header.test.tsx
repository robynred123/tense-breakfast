/* eslint-disable testing-library/await-async-query */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { mockStore, initialState } from '../mocks/mockStore';
import { Header } from './Header';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

describe('<Header />', () => {
  let mockUseLocationValue = {
    pathname: '/Therapist',
    search: '',
    hash: '',
    state: null,
  };

  const history = createBrowserHistory();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should render the header component successfully with filter icon', () => {
    const store = mockStore(initialState);
    const view = renderer.create(
      <Provider store={store}>
        <Router navigator={history} location={'/'}>
          <Header />
        </Router>
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
        <Router navigator={history} location={'/'}>
          <Header />
        </Router>
      </Provider>
    );
    expect(view.toJSON()).toMatchSnapshot();
    expect(view.root.findByType('svg').props['data-testid']).toEqual('CloseIcon');
  });

  it('Should render the header component successfully with no icon', () => {
    const store = mockStore(initialState);
    mockUseLocationValue.pathname = '/Therapist';
    const view = renderer.create(
      <Provider store={store}>
        <Router navigator={history} location={mockUseLocationValue}>
          <Header />
        </Router>
      </Provider>
    );
    expect(view.toJSON()).toMatchSnapshot();
  });
});

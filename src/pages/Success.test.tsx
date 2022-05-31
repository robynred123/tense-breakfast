/* eslint-disable testing-library/await-async-query */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { mockStore, initialState } from '../mocks/mockStore';
import { SuccessPage } from './Success';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

describe('<SuccessPage />', () => {
  let mockUseLocationValue = {
    pathname: '/Success',
    search: '',
    hash: '',
    state: null,
  };

  const history = createBrowserHistory();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should render the Success Page successfully', () => {
    const store = mockStore(initialState);
    const view = renderer.create(
      <Provider store={store}>
        <Router navigator={history} location={'/'}>
          <SuccessPage />
        </Router>
      </Provider>
    );
    expect(view.toJSON()).toMatchSnapshot();
    expect(view.root.findByType('h2').props.children).toEqual('Appointment Requested');
    expect(view.root.findByType('h3').props.children).toEqual(
      'You will receive confirmation shortly'
    );
    expect(view.root.findByType('button').props.children).toEqual([
      [undefined, 'OK', undefined],
      null,
    ]);
  });
});

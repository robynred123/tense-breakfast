/* eslint-disable testing-library/await-async-query */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { mockStore, initialState } from '../mocks/mockStore';
import { ConfirmPage } from './Confirm';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { therapistOne } from '../mocks/testData';
import { BookingOptions } from '../types';

describe('<ConfirmPage />', () => {
  const mockBookingoptions: BookingOptions = {
    therapistId: therapistOne.id,
    appointmentType: 'one_off',
    appointmentMedium: 'phone',
    appointmentDate: 'fe69895c-8a90-426b-89d1-de9043e3bb99',
  };

  const therapistName: string = `${therapistOne.firstName} ${therapistOne.lastName}`;

  const mockUseLocationValue = {
    pathname: '/Confirm',
    search: '',
    hash: '',
    state: {
      bookingOptions: mockBookingoptions,
      therapistName: therapistName,
      dateTime: {
        id: 'fe69895c-8a90-426b-89d1-de9043e3bb99',
        datetime: '2021-08-17T07:00:00.000Z',
      },
    },
  };

  const history = createBrowserHistory();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should render the confirm Page successfully with expected data', () => {
    const store = mockStore(initialState);
    const view = renderer.create(
      <Provider store={store}>
        <Router navigator={history} location={mockUseLocationValue}>
          <ConfirmPage />
        </Router>
      </Provider>
    );
    expect(view.toJSON()).toMatchSnapshot();
    expect(view.root.findByType('h2').props.children).toEqual('Confirm Appointment');
    expect(view.root.findAllByType('h5')[0].props.children).toEqual('Therapist:');
    expect(view.root.findAllByType('h5')[1].props.children).toEqual(therapistName);
    expect(view.root.findAllByType('h5')[2].props.children).toEqual('Date/Time:');
    expect(view.root.findAllByType('h5')[3].props.children).toEqual(
      'Tuesday, August 17, 2021 8:00 AM'
    );
    expect(view.root.findAllByType('h5')[4].props.children).toEqual('Type:');
    expect(view.root.findAllByType('h5')[5].props.children).toEqual('one_off');
    expect(view.root.findAllByType('h5')[6].props.children).toEqual('Medium:');
    expect(view.root.findAllByType('h5')[7].props.children).toEqual('phone');

    expect(view.root.findAllByType('button')[0].props.children).toEqual([
      [undefined, 'Cancel', undefined],
      null,
    ]);
    expect(view.root.findAllByType('button')[1].props.children).toEqual([
      [undefined, 'OK', undefined],
      null,
    ]);
  });
});

/* eslint-disable testing-library/await-async-query */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { therapistOne } from '../mocks/testData';
import { mockStore, initialState } from '../mocks/mockStore';
import { Router } from 'react-router';
import { TherapistPage } from './Therapist';
import { createBrowserHistory } from 'history';
import { mockBio } from '../constants/mockInfo';

describe('<TherapistPage />', () => {
  let mockUseLocationValue = {
    pathname: '/Therapist',
    key: '',
    search: '',
    hash: '',
    state: { therapist: therapistOne },
  };

  const history = createBrowserHistory();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should render the Therapist page successfully', () => {
    const store = mockStore(initialState);
    const view = renderer.create(
      <Provider store={store}>
        <Router navigator={history} location={mockUseLocationValue}>
          <TherapistPage />
        </Router>
      </Provider>
    );

    expect(view.toJSON()).toMatchSnapshot();
    // Therapist Data
    expect(view.root.findAllByType('svg')[0].props['data-testid']).toEqual('CircleIcon');
    expect(view.root.findByType('h2').props.children).toEqual(['Albert', ' ', 'Einstein']);
    expect(view.root.findAllByType('p')[0].props.children).toEqual(mockBio);

    // Date selector
    expect(view.root.findAllByType('h5')[0].props.children).toEqual('Appointment Time');
    expect(view.root.findByProps({ 'aria-haspopup': 'listbox' })).toBeDefined();
    expect(view.root.findAllByType('input')[0].props.className).toEqual(
      'MuiSelect-nativeInput css-yf8vq0-MuiSelect-nativeInput'
    );

    // Appointment Type
    expect(view.root.findAllByType('h5')[1].props.children).toEqual('Appointment Type');
    expect(view.root.findAllByType('button')[0].props.children).toEqual([
      [undefined, 'One Off', undefined],
      null,
    ]);
    expect(view.root.findAllByType('button')[0].props.disabled).toEqual(false);
    expect(view.root.findAllByType('button')[1].props.children).toEqual([
      [undefined, 'Consultation', undefined],
      null,
    ]);
    expect(view.root.findAllByType('button')[1].props.disabled).toEqual(true);

    // Appointment Medium
    expect(view.root.findAllByType('h5')[2].props.children).toEqual('Appointment Medium');
    const phoneSvg = view.root.findAllByType('svg')[2];
    expect(phoneSvg.props['data-testid']).toEqual('PhoneIcon');
    expect(view.root.findAllByType('button')[2].props.disabled).toEqual(false);
    expect(view.root.findAllByType('p')[1].props.children).toEqual('Phone');
    const videoSvg = view.root.findAllByType('svg')[3];
    expect(videoSvg.props['data-testid']).toEqual('VideoCallIcon');
    expect(view.root.findAllByType('button')[3].props.disabled).toEqual(true);
    expect(view.root.findAllByType('p')[2].props.children).toEqual('Video');

    // End Buttons
    expect(view.root.findAllByType('button')[4].props.disabled).toEqual(false);
    expect(view.root.findAllByType('button')[4].props.children).toEqual([
      [undefined, 'Cancel', undefined],
      null,
    ]);
    expect(view.root.findAllByType('button')[5].props.disabled).toEqual(true);
    expect(view.root.findAllByType('button')[5].props.children).toEqual([
      [undefined, 'Book', undefined],
      null,
    ]);
  });
});

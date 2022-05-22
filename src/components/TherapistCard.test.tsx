/* eslint-disable testing-library/await-async-query */
import React from 'react';
import renderer from 'react-test-renderer';
import { TherapistCard } from './TherapistCard';
import { TherapistInfo } from '../types';

describe('<TherapistCard />', () => {
  it('Should render the Therapist Card component successfully', () => {
    const testTherapist: TherapistInfo = {
      id: '063eb398-45f7-4a9c-a5d3-e95d14c05c44',
      firstName: 'Albert',
      lastName: 'Einstein',
      appointment_types: ['one-off'],
      appointment_mediums: ['phone'],
      specialisms: ['alcoholism'],
    };
    const view = renderer.create(<TherapistCard {...testTherapist} />);
    expect(view.toJSON()).toMatchSnapshot();
    expect(view.root.findByType('svg').props['data-testid']).toEqual('AccountCircleIcon');
    expect(view.root.findByType('h4').props.children).toEqual(['Albert', ' ', 'Einstein']);
  });
});

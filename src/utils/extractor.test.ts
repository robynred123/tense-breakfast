import { Specialisms, TherapistInfo } from '../types';
import { extractSpecialisms } from './extractor';

const therapistOne: TherapistInfo = {
  id: '063eb398-45f7-4a9c-a5d3-e95d14c05c44',
  firstName: 'Albert',
  lastName: 'Einstein',
  appointment_types: ['one_off'],
  appointment_mediums: ['phone'],
  specialisms: ['Alcoholism'],
};

const therapistTwo: TherapistInfo = {
  id: '154aa58b-4c25-4d64-a7a2-9288a7d94468',
  firstName: 'Jackie',
  lastName: 'Chan',
  appointment_types: ['consultation', 'one_off'],
  appointment_mediums: ['video'],
  specialisms: ['Gender identity'],
};

describe('extractSpecialisms', () => {
  it('Should add specialisms if none in array', () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const therapistSpecialisms: Specialisms[] = [];

    const array = extractSpecialisms(therapists, therapistSpecialisms);
    expect(array).toEqual(['Alcoholism', 'Gender identity']);
  });

  it('Should add specialisms if some already in array', () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const therapistSpecialisms: Specialisms[] = ['ADHD', 'Bereavement'];

    const array = extractSpecialisms(therapists, therapistSpecialisms);
    expect(array).toEqual(['ADHD', 'Alcoholism', 'Bereavement', 'Gender identity']);
  });

  it('Should not add specialisms again if already in array', () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const therapistSpecialisms: Specialisms[] = ['Gender identity'];

    const array = extractSpecialisms(therapists, therapistSpecialisms);
    expect(array).toEqual(['Alcoholism', 'Gender identity']);
  });

  it('Should return an empty array if no specialisms', () => {
    const therapists: TherapistInfo[] = [
      { ...therapistOne, specialisms: [] },
      { ...therapistTwo, specialisms: [] },
    ];
    const therapistSpecialisms: Specialisms[] = [];

    const array = extractSpecialisms(therapists, therapistSpecialisms);
    expect(array).toEqual([]);
  });

  it('Should return an empty array if no therapists', () => {
    const therapists: TherapistInfo[] = [];
    const therapistSpecialisms: Specialisms[] = [];

    const array = extractSpecialisms(therapists, therapistSpecialisms);
    expect(array).toEqual([]);
  });
});

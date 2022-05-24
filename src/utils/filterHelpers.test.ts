import { AppointmentType, Specialisms, TherapistInfo } from '../types';
import { filterHelper, filterSpecialisms } from './filterHelpers';

const therapistOne: TherapistInfo = {
  id: '063eb398-45f7-4a9c-a5d3-e95d14c05c44',
  firstName: 'Albert',
  lastName: 'Einstein',
  appointment_types: ['one_off'],
  appointment_mediums: ['phone'],
  specialisms: ['Alcoholism', 'Gender identity', 'Gambling Addiction'],
};

const therapistTwo: TherapistInfo = {
  id: '154aa58b-4c25-4d64-a7a2-9288a7d94468',
  firstName: 'Jackie',
  lastName: 'Chan',
  appointment_types: ['consultation', 'one_off'],
  appointment_mediums: ['video'],
  specialisms: ['Gender identity', 'Alcoholism'],
};

describe('filterHelper', () => {
  it('Should return expected therapist with type and specialism', () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const therapistSpecialisms: Specialisms[] = ['Gambling Addiction'];
    const appointmentTypes: AppointmentType[] = ['one_off'];

    const filteredTherapists = filterHelper(therapists, appointmentTypes, therapistSpecialisms);
    expect(filteredTherapists).toEqual([therapistOne]);
  });

  it('Should return no therapists if the filters do not match', () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const therapistSpecialisms: Specialisms[] = ['Hypnotherapy'];
    const appointmentTypes: AppointmentType[] = ['one_off'];

    const filteredTherapists = filterHelper(therapists, appointmentTypes, therapistSpecialisms);
    expect(filteredTherapists).toEqual([]);
  });

  it('Should return both therapists if filters match', () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const therapistSpecialisms: Specialisms[] = ['Alcoholism', 'Gender identity'];
    const appointmentTypes: AppointmentType[] = ['one_off'];

    const filteredTherapists = filterHelper(therapists, appointmentTypes, therapistSpecialisms);
    expect(filteredTherapists).toEqual([therapistOne, therapistTwo]);
  });

  it('Should not throw an error with no therapists', () => {
    const therapists: TherapistInfo[] = [];
    const therapistSpecialisms: Specialisms[] = [];
    const appointmentTypes: AppointmentType[] = ['one_off'];

    const filteredTherapists = filterHelper(therapists, appointmentTypes, therapistSpecialisms);
    expect(filteredTherapists).toEqual([]);
  });
});

describe('filterSpecialisms', () => {
  it('Should return expected therapist with matching specialism', () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const therapistSpecialisms: Specialisms[] = ['Gambling Addiction'];

    const filteredTherapists = filterSpecialisms(therapists, therapistSpecialisms);
    expect(filteredTherapists).toEqual([therapistOne]);
  });

  it('Should return expected therapists with no specialism', () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const therapistSpecialisms: Specialisms[] = [];

    const filteredTherapists = filterSpecialisms(therapists, therapistSpecialisms);
    expect(filteredTherapists).toEqual(therapists);
  });

  it('Should return no therapists with no matching specialism', () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const therapistSpecialisms: Specialisms[] = ['Hypnotherapy'];

    const filteredTherapists = filterSpecialisms(therapists, therapistSpecialisms);
    expect(filteredTherapists).toEqual([]);
  });

  it('Should not throw an error with no therapists', () => {
    const therapists: TherapistInfo[] = [];
    const therapistSpecialisms: Specialisms[] = [];

    const filteredTherapists = filterSpecialisms(therapists, therapistSpecialisms);
    expect(filteredTherapists).toEqual([]);
  });
});

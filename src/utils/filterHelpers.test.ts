import moment from 'moment';
import { AppointmentType, Availabilities, Specialisms, TherapistInfo } from '../types';
import { filterHelper, filterByDate } from './filterHelpers';

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

  it('Should return expected therapist with matching specialism', () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const appointmentTypes: AppointmentType[] = [];
    const therapistSpecialisms: Specialisms[] = ['Gambling Addiction'];

    const filteredTherapists = filterHelper(therapists, appointmentTypes, therapistSpecialisms);
    expect(filteredTherapists).toEqual([therapistOne]);
  });

  it('Should return expected therapists with no specialism', () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const appointmentTypes: AppointmentType[] = [];
    const therapistSpecialisms: Specialisms[] = [];

    const filteredTherapists = filterHelper(therapists, appointmentTypes, therapistSpecialisms);
    expect(filteredTherapists).toEqual(therapists);
  });

  it('Should return no therapists with no matching specialism', () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const appointmentTypes: AppointmentType[] = [];
    const therapistSpecialisms: Specialisms[] = ['Hypnotherapy'];

    const filteredTherapists = filterHelper(therapists, appointmentTypes, therapistSpecialisms);
    expect(filteredTherapists).toEqual([]);
  });

  it('Should not throw an error with no therapists', () => {
    const therapists: TherapistInfo[] = [];
    const appointmentTypes: AppointmentType[] = [];
    const therapistSpecialisms: Specialisms[] = [];

    const filteredTherapists = filterHelper(therapists, appointmentTypes, therapistSpecialisms);
    expect(filteredTherapists).toEqual([]);
  });
});

describe('filterByDate', () => {
  const response: Availabilities = {
    '063eb398-45f7-4a9c-a5d3-e95d14c05c44': [
      {
        id: 'f8489733-e02d-4c4f-ad8c-344e37655d73',
        datetime: '2021-08-05T09:00:00.000Z',
      },
    ],
    '154aa58b-4c25-4d64-a7a2-9288a7d94468': [
      {
        id: 'eed0cac6-bf29-41f5-9794-1c1c049cc1fd',
        datetime: '2021-08-07T10:00:00.000Z',
      },
      {
        id: 'e9e12c32-f553-417a-83f3-72a0fd6127ac',
        datetime: '2021-07-27T17:00:00.000Z',
      },
    ],
  };
  it('Should return expected therapist with appointment in date range', async () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const start = '2021-08-04T12:00:00.000Z';
    const end = '2021-08-06T13:00:00.000Z';

    const filteredTherapists = await filterByDate(therapists, response, start, end);
    expect(filteredTherapists).toEqual([therapistOne]);
  });

  it('Should return expected therapists with appointment in date range', async () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const start = '2021-08-04T12:00:00.000Z';
    const end = '2021-08-09T13:00:00.000Z';

    const filteredTherapists = await filterByDate(therapists, response, start, end);
    expect(filteredTherapists).toEqual(therapists);
  });

  it('Should return empty array with no therapists with availability', async () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const start = '2022-08-04T12:00:00.000Z';
    const end = '2022-08-09T13:00:00.000Z';

    const filteredTherapists = await filterByDate(therapists, response, start, end);
    expect(filteredTherapists).toEqual([]);
  });

  it('Should return empty array if somehow called with no start or end', async () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const start = '';
    const end = '';

    const filteredTherapists = await filterByDate(therapists, response, start, end);
    expect(filteredTherapists).toEqual([]);
  });
});

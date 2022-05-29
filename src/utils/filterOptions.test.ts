import { FilterOptions } from '../types';
import {
  updateTypesArray,
  updateSpecialismsArray,
  handleFilters,
  determineSelectedType,
} from './filterOptions';

describe('determineSelectedtype', () => {
  it('Should return green if value is in array', () => {
    const array = determineSelectedType('one_off', ['one_off', 'consultation']);
    expect(array).toEqual('green');
  });
  it('Should return grey if value is not in array', () => {
    const array = determineSelectedType('one_off', []);
    expect(array).toEqual('grey');
  });
});

describe('updateTypesArray', () => {
  it('Should add type to array of options if not in it', () => {
    const array = updateTypesArray('one_off', []);
    expect(array).toEqual(['one_off']);
  });
  it('Should remove type to array of options if not in it', () => {
    const array = updateTypesArray('one_off', ['one_off']);
    expect(array).toEqual([]);
  });
});

describe('updateSpecialismsArray', () => {
  it('Should add type to array of options if not in it', () => {
    const array = updateSpecialismsArray('ADHD', []);
    expect(array).toEqual(['ADHD']);
  });
  it('Should remove type to array of options if not in it', () => {
    const array = updateSpecialismsArray('ADHD', ['ADHD']);
    expect(array).toEqual([]);
  });
});

describe('handleFilters', () => {
  const options: FilterOptions = {
    appointmentType: [],
    dateRange: {
      start: null,
      end: null,
    },
    specialisms: [],
  };
  it('Should return updated types', () => {
    const options = handleFilters('one_off', 'type', [], { start: null, end: null }, []);
    expect(options).toEqual({ ...options, appointmentType: ['one_off'] });
  });

  it('Should return updated specialisms', () => {
    const options = handleFilters('Hypnotherapy', 'specialism', [], { start: null, end: null }, []);
    expect(options).toEqual({ ...options, specialisms: ['Hypnotherapy'] });
  });

  it('Should return updated dateRange', () => {
    const testDate: string = '2021-08-05T09:00:00.000Z';
    const options = handleFilters(
      { start: testDate, end: testDate },
      'date',
      [],
      { start: null, end: null },
      []
    );
    expect(options).toEqual({ ...options, dateRange: { start: testDate, end: testDate } });
  });
  it('Should return default information with nothing new added', () => {
    const options = handleFilters('', 'date', [], { start: null, end: null }, []);
    expect(options).toEqual(options);
  });
});

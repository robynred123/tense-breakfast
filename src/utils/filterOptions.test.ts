import { determineSelectedType } from './filterOptions';

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

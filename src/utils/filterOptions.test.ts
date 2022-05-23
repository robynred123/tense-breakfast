import { updateTypesArray } from './filterOptions';

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

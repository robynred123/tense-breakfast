import { updateOptionsArray } from './filterOptions';

describe('updateOptionsArray', () => {
  it('Should add type to array of options if not in it', () => {
    const array = updateOptionsArray('one-off', []);
    expect(array).toEqual(['one-off']);
  });
  it('Should remove type to array of options if not in it', () => {
    const array = updateOptionsArray('one-off', ['one-off']);
    expect(array).toEqual([]);
  });
});

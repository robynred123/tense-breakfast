/* eslint-disable testing-library/await-async-query */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { mockStore, initialState, filterOptions } from '../mocks/mockStore';
import { FilterMenu } from './FilterMenu';

describe('<FilterMenu />', () => {
  const therapistSpecialisms = ['ADHD'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render the FilterMenu component successfully', () => {
    const store = mockStore(initialState);
    const view = renderer.create(
      <Provider store={store}>
        <FilterMenu filterOptions={filterOptions} therapistSpecialisms={therapistSpecialisms} />
      </Provider>
    );
    expect(view.toJSON()).toMatchSnapshot();
    expect(view.root.findByType('h4').props.children).toEqual('Filter Results');
    expect(view.root.findAllByType('h5')[0].props.children).toEqual('Dates');
    expect(view.root.findAllByType('label')[0].props.children[0]).toEqual('Start Date');
    expect(view.root.findAllByType('label')[1].props.children[0]).toEqual('End Date');

    expect(view.root.findAllByType('h5')[1].props.children).toEqual('Appointment Type');
    const buttons = view.root.findAllByType('button');
    expect(buttons[0].props.children).toEqual([[undefined, 'One Off', undefined], null]);
    expect(buttons[1].props.children).toEqual([[undefined, 'Consultation', undefined], null]);

    expect(view.root.findAllByType('h5')[2].props.children).toEqual('Specialism');
    expect(view.root.findAllByType('input')[2].props.type).toEqual('checkbox');
    expect(view.root.findAllByType('input')[2].props.checked).toEqual(false);
    expect(view.root.findAllByType('label')[2].props.children[1].props.children).toEqual('ADHD');
  });
});

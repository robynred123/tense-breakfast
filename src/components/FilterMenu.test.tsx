/* eslint-disable testing-library/await-async-query */
import React from 'react';
import renderer from 'react-test-renderer';
import { FilterMenu } from './FilterMenu';

describe('<FilterMenu />', () => {
  it('Should render the button component successfully', () => {
    const view = renderer.create(<FilterMenu />);
    expect(view.toJSON()).toMatchSnapshot();
    expect(view.root.findByType('h5').props.children).toEqual('Filter Results');
    expect(view.root.findByType('h6').props.children).toEqual('Appointment Type');
    const buttons = view.root.findAllByType('button');
    expect(buttons[0].props.children).toEqual([[undefined, 'One-Off', undefined], null]);
    expect(buttons[1].props.children).toEqual([[undefined, 'Consultation', undefined], null]);
  });
});

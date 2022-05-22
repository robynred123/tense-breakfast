/* eslint-disable testing-library/await-async-query */
import React from 'react';
import renderer from 'react-test-renderer';
import { ButtonComponent, ButtonProps } from './Button';

describe('<ButtonComponent />', () => {
  it('Should render the button component successfully', () => {
    const props: ButtonProps = {
      text: 'Button!',
      onClick: () => jest.fn(),
      buttonColour: 'green',
      disabled: false,
      width: '10px',
    };
    const view = renderer.create(<ButtonComponent {...props} />);
    expect(view.toJSON()).toMatchSnapshot();
    expect(props.text).toEqual('Button!');
    expect(view.root.props.disabled).toEqual(false);
  });
});

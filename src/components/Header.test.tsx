import React from 'react';
import renderer from 'react-test-renderer';
import { Header } from './Header';

describe('<Header />', () => {
  it('Should render the header component successfully', () => {
    const view = renderer.create(<Header />);
    // eslint-disable-next-line testing-library/await-async-query
    const image = view.root.findByType('img');
    expect(view.toJSON()).toMatchSnapshot();
    expect(image.props.src).toEqual('spill-logo.png');
  });
});

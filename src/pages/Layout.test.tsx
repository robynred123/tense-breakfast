import React from 'react';
import renderer from 'react-test-renderer';
import { Layout } from './Layout';

describe('<Layout />', () => {
  it('Should render the layout component successfully', () => {
    // Struggling to render chldren in test
    const view = renderer.create(<Layout>Hi</Layout>);
    // eslint-disable-next-line testing-library/await-async-query
    const image = view.root.findByType('img');
    expect(view.toJSON()).toMatchSnapshot();
    expect(image.props.src).toEqual('spill-logo.png');
  });
});

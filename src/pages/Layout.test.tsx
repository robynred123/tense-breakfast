/* eslint-disable testing-library/await-async-query */
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { Layout } from './Layout';
import { initialState, mockStore } from '../mocks/mockStore';

describe('<Layout />', () => {
  const history = createBrowserHistory();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render the layout component successfully', () => {
    const store = mockStore(initialState);
    const view = renderer.create(
      <Provider store={store}>
        <Router navigator={history} location={'/'}>
          <Layout>Hi</Layout>
        </Router>
      </Provider>
    );
    // eslint-disable-next-line testing-library/await-async-query
    const image = view.root.findByType('img');
    expect(view.toJSON()).toMatchSnapshot();
    expect(image.props.src).toEqual('spill-logo.png');
  });

  it('Should render the layout component successfully with error', () => {
    const store = mockStore({ ...initialState, error: 'error' });
    const view = renderer.create(
      <Provider store={store}>
        <Router navigator={history} location={'/'}>
          <Layout>Hi</Layout>
        </Router>
      </Provider>
    );
    // eslint-disable-next-line testing-library/await-async-query
    const image = view.root.findByType('img');
    expect(view.toJSON()).toMatchSnapshot();
    expect(image.props.src).toEqual('spill-logo.png');
    expect(
      view.root.findByProps({ className: 'MuiAlert-message css-acap47-MuiAlert-message' }).props
        .children
    ).toEqual('error');
  });
});

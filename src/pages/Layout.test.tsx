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
});

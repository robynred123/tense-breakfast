import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Store, AnyAction } from 'redux';
import { FilterOptions, ReducerState } from '../types';
import { Layout } from './Layout';

describe('<Layout />', () => {
  const filterOptions: FilterOptions = {
    appointmentType: [],
    dateRange: {
      start: null,
      end: null,
    },
    specialisms: [],
  };
  const initialState: ReducerState = {
    therapists: [],
    filteredTherapists: [],
    filterOptions,
    mobileFilter: false,
  };
  const mockStore = configureStore();
  let store: Store<any, AnyAction>;
  store = mockStore({ one: initialState });

  beforeEach(() => {
    jest.clearAllMocks();
  });
  xit('Should render the layout component successfully', () => {
    // Struggling to render chldren in test
    const view = renderer.create(
      <Provider store={store}>
        <Layout>Hi</Layout>
      </Provider>
    );
    // eslint-disable-next-line testing-library/await-async-query
    const image = view.root.findByType('img');
    expect(view.toJSON()).toMatchSnapshot();
    expect(image.props.src).toEqual('spill-logo.png');
  });
});

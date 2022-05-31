import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { therapistOne, therapistTwo } from '../mocks/testData';
import { initialState } from '../mocks/mockStore';
import * as filterHelpers from '../utils/filterHelpers';
import { AppDispatch } from '../store';
import {
  AppointmentType,
  DateRange,
  FilterOptions,
  Specialisms,
  TherapistInfo,
  BookingOptions,
} from '../types';
import {
  getTherapists,
  updateFilterOptions,
  getAvailabilities,
  getAvailabilitiesById,
  filterTherapists,
  changeMobileFilter,
  bookingRequest,
  clearError,
} from './actions';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe('Actions', () => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore(initialState);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return therapists as expected and dispatch action', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [therapistOne],
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    await store.dispatch<AppDispatch | any>(getTherapists()).then(() => {
      expect(store.getActions()).toEqual([
        {
          payload: [
            {
              appointment_mediums: ['phone'],
              appointment_types: ['one_off'],
              firstName: 'Albert',
              id: '063eb398-45f7-4a9c-a5d3-e95d14c05c44',
              lastName: 'Einstein',
              specialisms: ['Alcoholism', 'Gender identity', 'Gambling Addiction'],
            },
          ],
          type: 'Therapists/setTherapists',
        },
      ]);
    });
  });

  it('should return an error as expected and dispatch action', async () => {
    mockedAxios.get.mockRejectedValue({
      error: 'test error',
      status: 500,
    });

    await store.dispatch<AppDispatch | any>(getTherapists()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[1]).toEqual({
        payload: 'Unabled to get therapists, please refresh the app.',
        type: 'Therapists/setError',
      });
    });
  });

  it('should return updatedFilterOptions as expected and dispatch action', async () => {
    const updatedFilterOptions: FilterOptions = {
      appointmentType: ['consultation'],
      dateRange: {
        start: '2021-08-06T11:00:00.000Z',
        end: '2021-08-17T14:00:00.000Z',
      },
      specialisms: ['ADHD'],
    };
    await store.dispatch<AppDispatch | any>(updateFilterOptions(updatedFilterOptions)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[2]).toEqual({
        payload: updatedFilterOptions,
        type: 'Therapists/setFilterOptions',
      });
    });
  });

  it('should get availabilities and return data', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        '79590113-a6a3-45c3-9d5e-28472a8c4a74': [
          {
            id: '7efa7bb4-6a1f-422f-9f5b-545a2a60fd62',
            datetime: '2021-08-17T07:00:00.000Z',
          },
        ],
      },
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });
    const availabilities = await getAvailabilities();
    expect(availabilities).toEqual({
      '79590113-a6a3-45c3-9d5e-28472a8c4a74': [
        {
          id: '7efa7bb4-6a1f-422f-9f5b-545a2a60fd62',
          datetime: '2021-08-17T07:00:00.000Z',
        },
      ],
    });
  });

  it('should get availabilities By Id and return data', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        '79590113-a6a3-45c3-9d5e-28472a8c4a74': [
          {
            id: '7efa7bb4-6a1f-422f-9f5b-545a2a60fd62',
            datetime: '2021-08-17T07:00:00.000Z',
          },
        ],
      },
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });
    const availabilities = await getAvailabilitiesById('79590113-a6a3-45c3-9d5e-28472a8c4a74');
    expect(availabilities).toEqual([
      {
        id: '7efa7bb4-6a1f-422f-9f5b-545a2a60fd62',
        datetime: '2021-08-17T07:00:00.000Z',
      },
    ]);
  });

  it('should return filtered therapists as expected and dispatch action', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        '063eb398-45f7-4a9c-a5d3-e95d14c05c44': [
          {
            id: '7efa7bb4-6a1f-422f-9f5b-545a2a60fd62',
            datetime: '2021-08-09T07:00:00.000Z',
          },
        ],
      },
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    jest.spyOn(filterHelpers, 'filterHelper').mockReturnValue([therapistOne]);
    jest.spyOn(filterHelpers, 'filterByDate').mockResolvedValue([therapistOne]);

    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const appointmentTypes: AppointmentType[] = ['one_off'];
    const dateRange: DateRange = {
        start: '2021-08-06T11:00:00.000Z',
        end: '2021-08-17T14:00:00.000Z',
      },
      specialisms: Specialisms[] = ['ADHD'];

    await store
      .dispatch<AppDispatch | any>(
        filterTherapists(therapists, appointmentTypes, dateRange, specialisms)
      )
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[3]).toEqual({
          payload: [therapistOne],
          type: 'Therapists/setFilteredTherapists',
        });
      });
  });

  it('should return all therapists as expected and dispatch action', async () => {
    const therapists: TherapistInfo[] = [therapistOne, therapistTwo];
    const appointmentTypes: AppointmentType[] = [];
    const dateRange: DateRange = {
        start: null,
        end: null,
      },
      specialisms: Specialisms[] = [];

    await store
      .dispatch<AppDispatch | any>(
        filterTherapists(therapists, appointmentTypes, dateRange, specialisms)
      )
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[4]).toEqual({
          payload: [therapistOne, therapistTwo],
          type: 'Therapists/setFilteredTherapists',
        });
      });
  });

  it('should dispatch setMobileFilter action', async () => {
    await store.dispatch<AppDispatch | any>(changeMobileFilter(true));
    const storeActions = store.getActions();
    expect(storeActions[5]).toEqual({
      payload: true,
      type: 'Therapists/setMobileFilter',
    });
  });

  it('should post booking request and dispatch action and navigate', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {},
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    const navigate = jest.fn();
    const mockBookingOptions: BookingOptions = {
      therapistId: therapistOne.id,
      appointmentType: 'one_off',
      appointmentMedium: 'video',
      appointmentDate: '7efa7bb4-6a1f-422f-9f5b-545a2a60fd62',
    };

    await store
      .dispatch<AppDispatch | any>(bookingRequest(mockBookingOptions, navigate))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[6]).toEqual({
          payload: undefined,
          type: 'Therapists/clearFilterOptions',
        });
        expect(navigate).toHaveBeenCalledWith('/Success');
      });
  });

  it('should dispatch setError action with null', async () => {
    await store.dispatch<AppDispatch | any>(clearError()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[7]).toEqual({
        payload: null,
        type: 'Therapists/setError',
      });
    });
  });
});

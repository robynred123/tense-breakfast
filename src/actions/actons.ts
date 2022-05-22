import axios from 'axios';
import { slice } from '../reducers/reducer';
import { AppDispatch } from '../store';
import { TherapistInfo } from '../types';

const { setTherapists } = slice.actions;

type TherapistsResponse = {
  data: TherapistInfo[];
};

export const getTherapists = () => async (dispatch: AppDispatch) => {
  await axios
    .get('data/counsellor-mock.json')
    .then((response: TherapistsResponse) => {
      dispatch(setTherapists(response.data as TherapistInfo[]));
    })
    .catch((error: any) => console.log(error));
};

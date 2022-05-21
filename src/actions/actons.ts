import { slice } from '../reducers/reducer';
import { AppDispatch } from '../store';

const { setStatus } = slice.actions;

export const updateStatus = (status: string) => (dispatch: AppDispatch) => {
  dispatch(setStatus(status));
};

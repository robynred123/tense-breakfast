import { useLocation } from 'react-router-dom';
import { TherapistInfo } from '../types';

interface State {
  therapist: TherapistInfo;
}

export const TherapistPage = () => {
  const { state } = useLocation();
  const { therapist } = state as State;
  console.log(therapist);
  return <div>{therapist.firstName}</div>;
};

import { useEffect } from 'react';
import { getTherapists } from '../actions/actons';
import { TherapistCard } from '../components/TherapistCard';
import { useAppDispatch, useAppSelector } from '../store';

export const Index = () => {
  const { therapists } = useAppSelector((state) => state.one);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (therapists.length === 0) {
      dispatch(getTherapists());
    }
  }, [dispatch, therapists]);

  const renderTherapists = () =>
    therapists
      ? therapists.map((therapist) => {
          return <TherapistCard {...therapist} />;
        })
      : null;

  return (
    <div className='App'>
      <div className='App-header'>{renderTherapists()}</div>
    </div>
  );
};

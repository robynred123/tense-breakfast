import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAvailabilitiesById } from '../actions/actions';
import { AvailabilityData, TherapistInfo } from '../types';

interface State {
  therapist: TherapistInfo;
}

export const TherapistPage = () => {
  const { state } = useLocation();
  const { therapist } = state as State;
  const [availabilities, setAvailabilities] = useState<AvailabilityData[] | null>(null);

  useEffect(() => {
    const asyncFetch = async () => {
      const availabiities = await getAvailabilitiesById(therapist.id);
      return setAvailabilities(availabiities);
    };

    asyncFetch();
  }, [therapist]);

  return (
    <div>
      {availabilities?.map((a) => (
        <p>{a.datetime}</p>
      ))}
    </div>
  );
};

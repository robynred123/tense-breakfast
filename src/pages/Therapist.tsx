import { Circle } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAvailabilitiesById } from '../actions/actions';
import { ButtonComponent } from '../components/Button';
import { TEAL } from '../constants/colours';
import { mockBio } from '../constants/mockInfo';
import { AvailabilityData, TherapistInfo, AppointmentType, AppointmentMedium } from '../types';
import { determineSelectedType } from '../utils/filterOptions';

interface State {
  therapist: TherapistInfo;
}

export const TherapistPage = () => {
  const { state } = useLocation();
  const { therapist } = state as State;
  const [availabilities, setAvailabilities] = useState<AvailabilityData[] | null>(null);
  const [type, setType] = useState<AppointmentType>('one_off');

  useEffect(() => {
    const asyncFetch = async () => {
      const availabiities = await getAvailabilitiesById(therapist.id);
      return setAvailabilities(availabiities);
    };

    asyncFetch();
  }, [therapist]);

  return (
    <Box sx={{ flexGrow: 1, width: 1, flexDirection: 'column', justifyContent: 'center' }}>
      <Grid container>
        <Grid container sx={{ flexDirection: 'column' }}>
          {/* Therapist picture/ placeholder */}
          <Grid item sm={4} md={4} lg={4} xl={4}>
            <Circle style={{ color: TEAL, minHeight: '300px', width: '100%' }} />
          </Grid>
          {/* Therapist Name */}
          <Grid
            item
            sm={8}
            md={8}
            lg={8}
            xl={8}
            sx={{ padding: '3em', paddingBottom: 0, width: '100%' }}
          >
            <Typography
              variant='h2'
              fontFamily={'lato, sans-serif'}
              sx={{ justifyContent: 'flex-start' }}
            >
              {therapist.firstName} {therapist.lastName}
            </Typography>
            {/* Bio section */}
            <Typography
              variant='body1'
              fontFamily={'lato, sans-serif'}
              sx={{ justifyContent: 'flex-start' }}
            >
              {mockBio}
            </Typography>
            {/* Appointment Type */}
            <Grid container sx={{ paddingTop: '3em', flexDirection: 'column' }}>
              <Grid item sm={12} md={12} lg={12} xl={12}>
                <Typography
                  variant='h5'
                  fontFamily={'lato, sans-serif'}
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Appointment Type
                </Typography>

                <Grid
                  item
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  sx={{ justifyContent: 'space-evenly', display: 'flex' }}
                >
                  <ButtonComponent
                    onClick={() => setType('one_off')}
                    text='One Off'
                    buttonColour={determineSelectedType('one_off', [type])}
                    disabled={false}
                    width={'40%'}
                  />
                  <ButtonComponent
                    onClick={() => setType('consultation')}
                    text='Consultation'
                    buttonColour={determineSelectedType('consultation', [type])}
                    disabled={false}
                    width={'40%'}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

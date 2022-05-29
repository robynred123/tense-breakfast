import { useEffect, useState } from 'react';
import { Circle, Phone, VideoCall } from '@mui/icons-material';
import { Box, Grid, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

import { bookingRequest, getAvailabilitiesById } from '../actions/actions';
import { ButtonComponent } from '../components/Button';
import { DARK_GREY, TEAL, WHITE } from '../constants/colours';
import { mockBio } from '../constants/mockInfo';
import { AvailabilityData, TherapistInfo, AppointmentType, AppointmentMedium } from '../types';
import { determineSelectedType } from '../utils/filterOptions';
import { useAppDispatch } from '../store';

interface State {
  therapist: TherapistInfo;
}

export const TherapistPage = () => {
  const { state } = useLocation();
  const { therapist } = state as State;
  const [availabilities, setAvailabilities] = useState<AvailabilityData[] | null>(null);
  const [type, setType] = useState<AppointmentType | null>(null);
  const [medium, setMedium] = useState<AppointmentMedium | null>(null);
  const [time, setTime] = useState<any>('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const asyncFetch = async () => {
      const availabilities = await getAvailabilitiesById(therapist.id);
      return setAvailabilities(
        availabilities.sort((a, b) => Date.parse(a.datetime) - Date.parse(b.datetime))
      );
    };

    asyncFetch();
  }, [therapist]);

  const handleSubmit = () => {
    const bookingOptions = {
      therapistId: therapist.id,
      appointmentType: type,
      apppointmentMedium: medium,
      AppointmentDate: time,
    };
    return dispatch(bookingRequest(bookingOptions));
  };

  const determineColour = (button: AppointmentMedium, type: string | null) => {
    if (type === 'text') {
      return medium === button ? 'black' : WHITE;
    } else return medium === button ? TEAL : DARK_GREY;
  };

  const determineBookDisabled = () => {
    if (availabilities == null || availabilities.length === 0) {
      return true;
    }
    if (availabilities !== null && availabilities.length > 0 && !time) {
      return true;
    }
    if (therapist.appointment_types.length > 0 && !type) {
      return true;
    }
    if (therapist.appointment_mediums.length > 0 && !medium) {
      return true;
    } else return false;
  };

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

            {/* Appointment Time */}
            <Grid container sx={{ paddingTop: '3em', flexDirection: 'column' }}>
              <Grid item sm={12} md={12} lg={12} xl={12}>
                <Typography
                  variant='h5'
                  fontFamily={'lato, sans-serif'}
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Appointment Time
                </Typography>

                <Grid item sx={{ justifyContent: 'space-evenly', display: 'flex' }}>
                  <Select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    sx={{ width: '90%' }}
                  >
                    {availabilities ? (
                      availabilities.map((appointment) => {
                        return (
                          <MenuItem value={appointment.id} key={appointment.id}>
                            {moment(appointment.datetime).format('LLLL')}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <p>No Appointments Available</p>
                    )}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid container sx={{ paddingTop: '3em', flexDirection: 'column' }}>
              {/* Appointment Type */}
              {therapist.appointment_types.length > 0 && (
                <Grid item sm={12} md={12} lg={12} xl={12}>
                  <Typography
                    variant='h5'
                    fontFamily={'lato, sans-serif'}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Appointment Type
                  </Typography>

                  <Grid item sx={{ justifyContent: 'space-evenly', display: 'flex' }}>
                    <ButtonComponent
                      onClick={() => setType('one_off')}
                      text='One Off'
                      buttonColour={determineSelectedType('one_off', [type as AppointmentType])}
                      disabled={!therapist.appointment_types.includes('one_off')}
                      width={'40%'}
                    />
                    <ButtonComponent
                      onClick={() => setType('consultation')}
                      text='Consultation'
                      buttonColour={determineSelectedType('consultation', [
                        type as AppointmentType,
                      ])}
                      disabled={!therapist.appointment_types.includes('consultation')}
                      width={'40%'}
                    />
                  </Grid>
                </Grid>
              )}

              {/* Appointment Method */}
              <Grid container sx={{ paddingTop: '3em', flexDirection: 'column' }}>
                {therapist.appointment_mediums.length > 0 && (
                  <Grid item sm={12} md={12} lg={12} xl={12}>
                    <Typography
                      variant='h5'
                      fontFamily={'lato, sans-serif'}
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Appointment Medium
                    </Typography>

                    <Grid item sx={{ justifyContent: 'space-evenly', display: 'flex' }}>
                      <IconButton
                        style={{
                          minHeight: '80px',
                          width: '40%',
                          backgroundColor: determineColour('phone', 'button'),
                          borderRadius: 10,
                          flexDirection: 'column',
                        }}
                        disabled={!therapist.appointment_mediums.includes('phone')}
                        onClick={() => setMedium('phone')}
                      >
                        <Phone
                          style={{
                            color: determineColour('phone', 'text'),
                            minHeight: '90%',
                            width: '100%',
                            minWidth: '75px',
                            padding: 0,
                          }}
                        />
                        <Typography
                          color={determineColour('phone', 'text')}
                          fontFamily={'lato, sans-serif'}
                        >
                          Phone
                        </Typography>
                      </IconButton>

                      <IconButton
                        style={{
                          minHeight: '80px',
                          width: '40%',
                          backgroundColor: determineColour('video', 'button'),
                          borderRadius: 10,
                          flexDirection: 'column',
                        }}
                        disabled={!therapist.appointment_mediums.includes('video')}
                        onClick={() => setMedium('video')}
                      >
                        <VideoCall
                          style={{
                            color: determineColour('video', 'text'),
                            minHeight: '90%',
                            width: '100%',
                            minWidth: '75px',
                            padding: 0,
                          }}
                        />
                        <Typography
                          color={determineColour('video', 'text')}
                          fontFamily={'lato, sans-serif'}
                        >
                          Video
                        </Typography>
                      </IconButton>
                    </Grid>
                  </Grid>
                )}
                {/* Submit and Cancel buttons */}
                <Grid
                  container
                  sx={{
                    paddingTop: '3em',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignContent: 'flex-end',
                  }}
                >
                  <ButtonComponent
                    onClick={() => navigate(-1)}
                    text='Cancel'
                    buttonColour={'grey'}
                    disabled={false}
                    width={'40%'}
                  />

                  <ButtonComponent
                    onClick={() => handleSubmit()}
                    text='Submit'
                    buttonColour={'green'}
                    disabled={determineBookDisabled()}
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

import { Box, Grid, Typography } from '@mui/material';
import moment from 'moment';
import { useNavigate, useLocation } from 'react-router-dom';
import { bookingRequest } from '../actions/actions';
import { ButtonComponent } from '../components/Button';
import { useAppDispatch } from '../store';
import { AvailabilityData, BookingOptions } from '../types';

interface State {
  bookingOptions: BookingOptions;
  therapistName: string;
  dateTime: AvailabilityData;
}

export const ConfirmPage = () => {
  const { state } = useLocation();
  const { bookingOptions, therapistName, dateTime } = state as State;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ flexGrow: 1, width: 1, flexDirection: 'row', wrap: 'nowrap' }}>
      <Grid
        item
        md={12}
        lg={12}
        sm={12}
        sx={{
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant='h2' fontFamily={'lato, sans-serif'} sx={{ padding: '1em' }}>
          Confirm Appointment
        </Typography>

        <Grid item sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h5' fontFamily={'lato, sans-serif'} sx={{ padding: '1em' }}>
            Therapist:
          </Typography>
          <Typography variant='h5' fontFamily={'lato, sans-serif'} sx={{ padding: '1em' }}>
            {therapistName}
          </Typography>
        </Grid>

        <Grid item sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h5' fontFamily={'lato, sans-serif'} sx={{ padding: '1em' }}>
            Date/Time:
          </Typography>
          <Typography variant='h5' fontFamily={'lato, sans-serif'} sx={{ padding: '1em' }}>
            {moment(dateTime.datetime).format('LLLL')}
          </Typography>
        </Grid>

        <Grid item sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h5' fontFamily={'lato, sans-serif'} sx={{ padding: '1em' }}>
            Type:
          </Typography>
          <Typography variant='h5' fontFamily={'lato, sans-serif'} sx={{ padding: '1em' }}>
            {bookingOptions.appointmentType}
          </Typography>
        </Grid>

        <Grid item sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h5' fontFamily={'lato, sans-serif'} sx={{ padding: '1em' }}>
            Medium:
          </Typography>
          <Typography variant='h5' fontFamily={'lato, sans-serif'} sx={{ padding: '1em' }}>
            {bookingOptions.apppointmentMedium}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ justifyContent: 'space-evenly', alignContent: 'center', padding: '2em' }}
      >
        <ButtonComponent
          onClick={() => navigate(-1)}
          text='Cancel'
          buttonColour={'grey'}
          disabled={false}
          width={'25%'}
        />
        <ButtonComponent
          onClick={() => dispatch(bookingRequest(bookingOptions, navigate))}
          text='OK'
          buttonColour={'gradient'}
          disabled={false}
          width={'25%'}
        />
      </Grid>
    </Box>
  );
};

import { Box, Grid, Typography } from '@mui/material';
import { useAppDispatch } from '../store';
import { DARK_GREY, GREY } from '../constants/colours';
import { AppointmentType, FilterOptions } from '../types';
import { ButtonComponent } from './Button';
import { updateFilterAppointmentType } from '../actions/actons';
import { updateOptionsArray } from '../utils/filterOptions';

export const FilterMenu = (filterOptions: FilterOptions) => {
  const { appointmentType } = filterOptions;
  console.log(appointmentType);
  const dispatch = useAppDispatch();

  const handleTypeChange = (value: AppointmentType) => {
    return dispatch(updateFilterAppointmentType(updateOptionsArray(value, appointmentType)));
  };

  const determineSelectedType = (value: AppointmentType) => {
    if (appointmentType.includes(value)) {
      return 'green';
    } else return 'grey';
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: 1,
        flexDirection: 'column',
        display: 'flex',
        backgroundColor: GREY,
        border: 'double',
        borderColor: DARK_GREY,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Grid container sx={{ alignContent: 'center', flexDirection: 'column' }}>
        <Grid item m={2}>
          <Typography variant='h5' fontFamily={'lato, sans-serif'}>
            Filter Results
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ flexDirection: 'column', padding: '0 2em 2em 2em' }}>
        <Grid container>
          <Grid item>
            <Typography variant='h6' fontFamily={'lato, sans-serif'}>
              Appointment Type
            </Typography>
          </Grid>
          <Grid container sx={{ width: '100%', justifyContent: 'space-evenly' }}>
            <ButtonComponent
              onClick={() => handleTypeChange('one-off')}
              text='One-Off'
              buttonColour={determineSelectedType('one-off')}
              disabled={false}
              width={'40%'}
            />
            <ButtonComponent
              onClick={() => handleTypeChange('consultation')}
              text='Consultation'
              buttonColour={determineSelectedType('consultation')}
              disabled={false}
              width={'40%'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

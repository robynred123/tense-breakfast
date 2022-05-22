import { Box, Grid, Typography } from '@mui/material';
import { DARK_GREY, GREY } from '../constants/colours';
import { ButtonComponent } from './Button';

export const FilterMenu = () => {
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
              onClick={() => console.log('clicked!')}
              text='One-Off'
              buttonColour='gradient'
              disabled={false}
              width={'40%'}
            />
            <ButtonComponent
              onClick={() => console.log('clicked!')}
              text='Consultation'
              buttonColour='gradient'
              disabled={false}
              width={'40%'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

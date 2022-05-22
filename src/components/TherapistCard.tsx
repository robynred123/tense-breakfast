import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DARK_GREY, GREY } from '../constants/colours';
import { TherapistInfo } from '../types';

export const TherapistCard = (props: TherapistInfo) => {
  const therapist = props;
  console.log(therapist);
  return (
    <div style={{ border: 'double', borderColor: DARK_GREY }}>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          backgroundColor: GREY,
          alignContent: 'center',
          padding: '2%',
        }}
      >
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={10} sx={{ padding: '2%', alignContent: 'center', flexGrow: 1 }}>
            <div style={{ borderWidth: '10px', borderColor: 'black' }}>
              <Typography variant='h4' fontFamily={'lato, sans-serif'}>
                {therapist.firstName} {therapist.lastName}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

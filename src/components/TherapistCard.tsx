import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { AccountCircle } from '@mui/icons-material';
import { DARK_GREY, GREY, TEAL } from '../constants/colours';
import { TherapistInfo } from '../types';

export const TherapistCard = (props: TherapistInfo) => {
  const therapist = props;
  return (
    <div key={therapist.firstName} style={{ border: 'double', borderColor: DARK_GREY }}>
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
          <Grid item xs={2}>
            {/*Default image placeholder, can have photos of the therapists in later versions */}
            <AccountCircle style={{ color: TEAL, height: '100%', width: '100%' }} />
          </Grid>
          <Grid item xs={10} sx={{ padding: '2%', alignItems: 'center', display: 'flex' }}>
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

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { GREY } from '../constants/colours';
import { TherapistInfo } from '../types';

export const TherapistCard = (props: TherapistInfo) => {
  const therapist = props;
  console.log(therapist);
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: GREY, minHeight: '100px', width: 1 }}>
      <Grid container>
        <Grid item xs={2} sx={{ justifyContent: 'center', flex: 1, padding: '1em' }}></Grid>
        <Grid item xs={10}>
          {therapist.firstName}
        </Grid>
      </Grid>
    </Box>
  );
};

import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../components/Button';

export const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, width: 1, flexDirection: 'row', wrap: 'nowrap' }}>
      <Grid
        item
        md={12}
        lg={12}
        sm={12}
        sx={{
          padding: '10%',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant='h2' fontFamily={'lato, sans-serif'} sx={{ paddingBottom: '1em' }}>
          Appointment Requested
        </Typography>
        <Typography variant='h3' fontFamily={'lato, sans-serif'}>
          You will receive confirmation shortly
        </Typography>
      </Grid>
      <Grid
        item
        lg={12}
        sx={{
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <ButtonComponent
          onClick={() => navigate('/')}
          text='OK'
          buttonColour={'gradient'}
          disabled={false}
          width={'20%'}
        />
      </Grid>
    </Box>
  );
};

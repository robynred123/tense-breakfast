import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { BLUE } from '../constants/colours';

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: BLUE, minHeight: '100px', width: 1 }}>
      <Grid container>
        <Grid item xs={4} lg={4} sx={{ justifyContent: 'center', flex: 1, padding: '1em' }}>
          <img
            src={require('../assets/spill-logo.png')}
            alt='spill logo'
            style={{ width: '50%', minWidth: '200px' }}
          />
        </Grid>
        <Grid item xs={8} lg={8}></Grid>
      </Grid>
    </Box>
  );
};

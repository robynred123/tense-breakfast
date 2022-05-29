import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Close, FilterAlt } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { changeMobileFilter } from '../actions/actions';
import { BLUE, WHITE } from '../constants/colours';
import { useAppDispatch, useAppSelector } from '../store';

export const Header = () => {
  const { mobileFilter } = useAppSelector((state) => state.one);
  const location = useLocation();
  const dispatch = useAppDispatch();

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
        <Grid item xs={6} md={6} lg={8}></Grid>
        {location.pathname === '/' && (
          <Grid item xs={2} md={2} lg={0} sx={{ display: { xs: 'flex', md: 'none', lg: 'none' } }}>
            {mobileFilter ? (
              <IconButton
                style={{ minHeight: '100%', width: '50%' }}
                onClick={() => dispatch(changeMobileFilter(false))}
              >
                <Close
                  style={{ color: WHITE, minHeight: '100%', width: '50%', minWidth: '75px' }}
                />
              </IconButton>
            ) : (
              <IconButton
                style={{ minHeight: '100%', width: '50%' }}
                onClick={() => dispatch(changeMobileFilter(true))}
              >
                <FilterAlt
                  style={{ color: WHITE, minHeight: '100%', width: '50%', minWidth: '75px' }}
                />
              </IconButton>
            )}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

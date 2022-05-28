import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, useMediaQuery, useTheme } from '@mui/material';

import { getTherapists, filterTherapists, changeMobileFilter } from '../actions/actions';
import { TherapistCard } from '../components/TherapistCard';
import { useAppDispatch, useAppSelector } from '../store';
import { FilterMenu } from '../components/FilterMenu';
import { Specialisms } from '../types';
import { extractSpecialisms } from '../utils/mapper';

export const Index = () => {
  const { therapists, filteredTherapists, filterOptions, mobileFilter } = useAppSelector(
    (state) => state.one
  );
  const { appointmentType, dateRange, specialisms } = filterOptions;
  const [therapistSpecialisms, setTherapistSpecialisms] = useState<Specialisms[]>([]);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    // on load screen, get therapists
    if (therapists.length === 0) {
      dispatch(getTherapists());
    }
    if (therapistSpecialisms.length === 0) {
      // after loading therapists, extract specialisms.
      const newSpecialisms = extractSpecialisms(therapists, therapistSpecialisms);
      setTherapistSpecialisms(newSpecialisms);
    }
  }, [dispatch, therapists, therapistSpecialisms]);

  useEffect(() => {
    dispatch(filterTherapists(therapists, appointmentType, dateRange, specialisms));
  }, [dispatch, therapists, appointmentType, dateRange, specialisms]);

  useEffect(() => {
    // uses mui media query hook to ensure filter menu is not full screen on larger screen sizes.
    if (matches && mobileFilter) {
      dispatch(changeMobileFilter(false));
    }
  });

  const renderTherapists = () =>
    filteredTherapists.length > 0 ? (
      filteredTherapists.map((therapist) => {
        return <TherapistCard key={therapist.id} {...therapist} />;
      })
    ) : (
      <Typography variant='h3' sx={{ textAlign: 'center' }} fontFamily={'lato, sans-serif'}>
        No Therapists Found Matching Selected Filters
      </Typography>
    );

  return (
    <Box sx={{ flexGrow: 1, width: 1, flexDirection: 'row', wrap: 'nowrap' }}>
      {mobileFilter ? (
        <Grid
          item
          md={12}
          lg={12}
          sm={12}
          sx={{
            padding: '5%',
          }}
        >
          <FilterMenu filterOptions={filterOptions} therapistSpecialisms={therapistSpecialisms} />
        </Grid>
      ) : (
        <Grid container>
          <Grid item sm={12} xs={12} md={8} lg={8} sx={{ padding: '5%' }}>
            <div>{renderTherapists()}</div>
          </Grid>
          <Grid
            item
            md={4}
            lg={4}
            sx={{
              paddingTop: '5%',
              paddingRight: '5%',
              display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
            }}
          >
            <FilterMenu filterOptions={filterOptions} therapistSpecialisms={therapistSpecialisms} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

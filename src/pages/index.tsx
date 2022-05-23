import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { getTherapists, filterTherapists } from '../actions/actons';
import { TherapistCard } from '../components/TherapistCard';
import { useAppDispatch, useAppSelector } from '../store';
import { FilterMenu } from '../components/FilterMenu';

export const Index = () => {
  const { therapists, filteredTherapists, filterOptions } = useAppSelector((state) => state.one);
  const { appointmentType, appointmentMedium, specialisms } = filterOptions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    // on load screen, get therapists
    if (therapists.length === 0) {
      dispatch(getTherapists());
    }
  }, [dispatch, therapists]);

  useEffect(() => {
    dispatch(filterTherapists(therapists, appointmentType));
  }, [dispatch, therapists, appointmentType, appointmentMedium, specialisms]);

  const renderTherapists = () =>
    filteredTherapists
      ? filteredTherapists.map((therapist) => {
          return <TherapistCard {...therapist} />;
        })
      : null;

  return (
    <Box sx={{ flexGrow: 1, width: 1, flexDirection: 'row' }}>
      <Grid container>
        <Grid item sm={12} xs={12} md={8} lg={8} sx={{ padding: '5%' }}>
          <div>{renderTherapists()}</div>
        </Grid>
        <Grid item xs={0} sm={0} md={4} lg={4} sx={{ paddingTop: '5%', paddingRight: '5%' }}>
          <FilterMenu {...filterOptions} />
        </Grid>
      </Grid>
    </Box>
  );
};

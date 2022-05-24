import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { getTherapists, filterTherapists } from '../actions/actons';
import { TherapistCard } from '../components/TherapistCard';
import { useAppDispatch, useAppSelector } from '../store';
import { FilterMenu } from '../components/FilterMenu';
import { Specialisms } from '../types';
import { extractSpecialisms } from '../utils/mapper';
import { Typography } from '@mui/material';

export const Index = () => {
  const { therapists, filteredTherapists, filterOptions } = useAppSelector((state) => state.one);
  const { appointmentType, dateRange, specialisms } = filterOptions;
  const [therapistSpecialisms, setTherapistSpecialisms] = useState<Specialisms[]>([]);
  const dispatch = useAppDispatch();

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
    dispatch(filterTherapists(therapists, appointmentType, specialisms));
  }, [dispatch, therapists, appointmentType, dateRange, specialisms]);

  const renderTherapists = () =>
    filteredTherapists ? (
      filteredTherapists.map((therapist) => {
        return <TherapistCard key={therapist.id} {...therapist} />;
      })
    ) : (
      <Typography variant='h2' fontFamily={'lato, sans-serif'}>
        No Therapists Found Matching Selected Filters
      </Typography>
    );

  return (
    <Box sx={{ flexGrow: 1, width: 1, flexDirection: 'row' }}>
      <Grid container>
        <Grid item sm={12} xs={12} md={8} lg={8} sx={{ padding: '5%' }}>
          <div>{renderTherapists()}</div>
        </Grid>
        <Grid item xs={0} sm={0} md={4} lg={4} sx={{ paddingTop: '5%', paddingRight: '5%' }}>
          <FilterMenu filterOptions={filterOptions} therapistSpecialisms={therapistSpecialisms} />
        </Grid>
      </Grid>
    </Box>
  );
};

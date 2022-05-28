import { useState, useEffect } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { useAppDispatch } from '../store';
import { DARK_GREY, GREY } from '../constants/colours';
import { AppointmentType, FilterOptions, Specialisms, DateRange, Type } from '../types';
import { ButtonComponent } from './Button';
import { updateFilterOptions } from '../actions/actions';
import { handleFilters } from '../utils/filterOptions';

interface MenuProps {
  filterOptions: FilterOptions;
  therapistSpecialisms: Specialisms[];
}

export const FilterMenu = (props: MenuProps) => {
  const { filterOptions, therapistSpecialisms } = props;
  const { appointmentType, dateRange, specialisms } = filterOptions;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const dispatch = useAppDispatch();

  const handleFilterChanges = (value: AppointmentType | Specialisms | DateRange, type: Type) => {
    return dispatch(
      updateFilterOptions(handleFilters(value, type, appointmentType, dateRange, specialisms))
    );
  };

  // only filter when both dates have been selected - reducers number of reloads
  useEffect(() => {
    if (startDate && endDate) {
      const dateRange = {
        start: startDate.toDateString(),
        end: endDate.toDateString(),
      };
      handleFilterChanges(dateRange, 'date');
    }
    // disabled to prevent needing to wrap handleFilterChanges in a useCallBack hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const determineSelectedType = (value: AppointmentType) => {
    if (appointmentType.includes(value)) {
      return 'green';
    } else return 'grey';
  };

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
          <Typography variant='h4' fontFamily={'lato, sans-serif'}>
            Filter Results
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ flexDirection: 'column', padding: '0 2em 2em 2em' }}>
        <Grid container>
          <Grid item>
            <Typography variant='h5' fontFamily={'lato, sans-serif'}>
              Dates
            </Typography>
          </Grid>
          <Grid container sx={{ width: '100%', justifyContent: 'center' }}>
            <FormGroup>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label='Start Date'
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  //minDate={new Date()}
                  renderInput={(params) => <TextField {...params} sx={{ margin: '1em' }} />}
                />
                <DatePicker
                  label='End Date'
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  minDate={startDate || null} //|| new Date() - can set current date as min date - however data is in 2021
                  renderInput={(params) => <TextField {...params} sx={{ margin: '1em' }} />}
                />
              </LocalizationProvider>
            </FormGroup>
          </Grid>
        </Grid>
        <Grid container sx={{ marginBottom: '2em' }}>
          <Grid item>
            <Typography variant='h5' fontFamily={'lato, sans-serif'}>
              Appointment Type
            </Typography>
          </Grid>
          <Grid container sx={{ width: '100%', justifyContent: 'space-evenly' }}>
            <ButtonComponent
              onClick={() => handleFilterChanges('one_off', 'type')}
              text='One Off'
              buttonColour={determineSelectedType('one_off')}
              disabled={false}
              width={'40%'}
            />
            <ButtonComponent
              onClick={() => handleFilterChanges('consultation', 'type')}
              text='Consultation'
              buttonColour={determineSelectedType('consultation')}
              disabled={false}
              width={'40%'}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography variant='h5' fontFamily={'lato, sans-serif'}>
              Specialism
            </Typography>
          </Grid>
          <Grid container sx={{ width: '100%', justifyContent: 'flex-start' }}>
            <FormGroup>
              {therapistSpecialisms &&
                therapistSpecialisms.map((specialism) => (
                  <FormControlLabel
                    key={specialism}
                    control={
                      <Checkbox
                        defaultChecked={false}
                        onChange={() => handleFilterChanges(specialism, 'specialism')}
                      />
                    }
                    label={specialism}
                  />
                ))}
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

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
import { AppointmentType, FilterOptions, Specialisms, DateRange } from '../types';
import { ButtonComponent } from './Button';
import { updateFilterOptions } from '../actions/actions';
import { updateSpecialismsArray, updateTypesArray } from '../utils/filterOptions';

interface MenuProps {
  filterOptions: FilterOptions;
  therapistSpecialisms: Specialisms[];
}

type Type = 'date' | 'type' | 'specialism';

export const FilterMenu = (props: MenuProps) => {
  const { filterOptions, therapistSpecialisms } = props;
  const { appointmentType, dateRange, specialisms } = filterOptions;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const dispatch = useAppDispatch();

  // TODO: Move this to a util file
  const handleFilterChanges = (value: AppointmentType | Specialisms | DateRange, type: Type) => {
    const newOptions: FilterOptions = {
      appointmentType: appointmentType,
      dateRange: {
        start: dateRange.start,
        end: dateRange.end,
      },
      specialisms: specialisms,
    };
    switch (type) {
      case 'type':
        return dispatch(
          updateFilterOptions({
            ...newOptions,
            appointmentType: updateTypesArray(value as AppointmentType, appointmentType),
          })
        );
      case 'specialism':
        return dispatch(
          updateFilterOptions({
            ...newOptions,
            specialisms: updateSpecialismsArray(value as Specialisms, specialisms),
          })
        );
      case 'date':
        return dispatch(
          updateFilterOptions({
            ...newOptions,
            dateRange: value as DateRange,
          })
        );
      default:
        break;
    }
  };

  // only filter when both dates have been selected - reducers number of actions dispatched & reloads
  useEffect(() => {
    if (startDate && endDate) {
      const dateRange = {
        start: startDate.toDateString(),
        end: endDate.toDateString(),
      };
      handleFilterChanges(dateRange, 'date');
    }
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
                  minDate={startDate} //|| new Date() - can set current date as min date - however data is in 2021
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

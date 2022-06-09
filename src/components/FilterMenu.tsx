import { useEffect, useState } from 'react';
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
import { AppointmentType, FilterOptions, Specialisms } from '../types';
import { ButtonComponent } from './Button';
import { updateFilterOptions } from '../actions/actions';
import { determineSelectedType } from '../utils/filterOptions';

interface MenuProps {
  filterOptions: FilterOptions;
  therapistSpecialisms: Specialisms[];
}

export const FilterMenu = (props: MenuProps) => {
  const { filterOptions, therapistSpecialisms } = props;
  const { appointmentType, dateRange, specialisms } = filterOptions;
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [types, setTypes] = useState<AppointmentType[]>([]);
  const [specialismsOption, setSpecialismsOption] = useState<Specialisms[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setStartDate(dateRange.start);
    setEndDate(dateRange.end);
    setTypes(appointmentType);
    setSpecialismsOption(specialisms);
  }, [appointmentType, dateRange.end, dateRange.start, specialisms]);

  const handleSubmit = () => {
    const newOptions: FilterOptions = {
      appointmentType: types,
      dateRange: {
        start: startDate || null,
        end: endDate || null,
      },
      specialisms: specialismsOption,
    };
    return dispatch(updateFilterOptions(newOptions));
  };

  const handleTypes = (type: AppointmentType) => {
    if (types.includes(type)) {
      return setTypes(types.filter((t) => t !== type));
    } else {
      return setTypes([...types, type]);
    }
  };

  const handleSpecialisms = (specialism: Specialisms) => {
    if (specialismsOption.includes(specialism)) {
      return setSpecialismsOption(specialismsOption.filter((s) => s !== specialism));
    } else {
      return setSpecialismsOption([...specialismsOption, specialism]);
    }
  };

  const determineChecked = (specialism: Specialisms) => {
    if (specialismsOption.includes(specialism)) {
      return true;
    }
    return false;
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
              onClick={() => handleTypes('one_off')}
              text='One Off'
              buttonColour={determineSelectedType('one_off', types)}
              disabled={false}
              width={'40%'}
            />
            <ButtonComponent
              onClick={() => handleTypes('consultation')}
              text='Consultation'
              buttonColour={determineSelectedType('consultation', types)}
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
                        checked={determineChecked(specialism)}
                        onChange={() => handleSpecialisms(specialism)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }
                    label={specialism}
                  />
                ))}
            </FormGroup>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <ButtonComponent
              onClick={() => handleSubmit()}
              text='Submit'
              buttonColour={'blue'}
              disabled={false}
              width={'40%'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import { useAppDispatch } from '../store';
import { DARK_GREY, GREY } from '../constants/colours';
import { AppointmentType, FilterOptions, Specialisms } from '../types';
import { ButtonComponent } from './Button';
import { updateFilterOptions } from '../actions/actons';
import { updateSpecialismsArray, updateTypesArray } from '../utils/filterOptions';

interface MenuProps {
  filterOptions: FilterOptions;
  therapistSpecialisms: Specialisms[];
}

type Type = 'date' | 'type' | 'method' | 'specialism';

export const FilterMenu = (props: MenuProps) => {
  const { filterOptions, therapistSpecialisms } = props;
  const { appointmentType, appointmentMedium, specialisms } = filterOptions;
  const dispatch = useAppDispatch();

  const handleFilterChanges = (value: AppointmentType | Specialisms, type: Type) => {
    const newOptions: FilterOptions = {
      appointmentType: appointmentType,
      appointmentMedium: appointmentMedium,
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
            specialisms: updateSpecialismsArray(value, specialisms),
          })
        );
      default:
        break;
    }
  };

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
        <Grid container sx={{ marginBottom: '2em' }}>
          <Grid item>
            <Typography variant='h5' fontFamily={'lato, sans-serif'}>
              Appointment Type
            </Typography>
          </Grid>
          <Grid container sx={{ width: '100%', justifyContent: 'space-evenly' }}>
            <ButtonComponent
              onClick={() => handleFilterChanges('one_off', 'type')}
              text='One_Off'
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

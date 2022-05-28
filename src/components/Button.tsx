import { Button } from '@mui/material';
import { DARK_GREY, LIGHT_BLUE, TEAL, WHITE } from '../constants/colours';

export type ButtonProps = {
  text: string;
  onClick: () => void;
  buttonColour: 'green' | 'grey' | 'gradient';
  disabled: boolean;
  width: string;
};

const setStyle = (buttonColour: string, sharedStyling: {}) => {
  switch (buttonColour) {
    case 'green':
      return {
        ...sharedStyling,
        backgroundColor: TEAL,
        color: 'black',
      };
    case 'grey':
      return {
        ...sharedStyling,
        color: WHITE,
        backgroundColor: DARK_GREY,
      };
    case 'gradient':
      return {
        ...sharedStyling,
        color: 'black',
        fontWeight: 'bold',
        paddng: '1em',
        backgroundImage: `linear-gradient(140deg, ${TEAL}, ${LIGHT_BLUE})`,
      };
    default:
      return {
        color: 'black',
        backgroundColor: TEAL,
      };
  }
};

export const ButtonComponent = (props: ButtonProps) => {
  const { onClick, text, buttonColour, disabled, width } = props;

  const sharedStyling = {
    width: width,
    borderRadius: '15px',
    minWidth: '125px',
    marginTop: '10px',
  };

  return (
    <Button sx={setStyle(buttonColour, sharedStyling)} onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  );
};

import { Button } from '@mui/material';
import { GREY, LIGHT_BLUE, TEAL, WHITE } from '../constants/colours';

type ButtonProps = {
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
      };
    case 'grey':
      return {
        ...sharedStyling,
        color: WHITE,
        backgroundColor: GREY,
      };
    case 'gradient':
      return {
        ...sharedStyling,
        color: 'black',
        backgroundImage: `linear-gradient(140deg, ${TEAL}, ${LIGHT_BLUE})`,
      };
    default:
      return {
        backgroundColor: TEAL,
      };
  }
};

export const ButtonComponent = (props: ButtonProps) => {
  const { onClick, text, buttonColour, disabled, width } = props;

  const sharedStyling = {
    width: width,
    borderRadius: '15px',
  };

  return (
    <Button sx={setStyle(buttonColour, sharedStyling)} onClick={() => onClick} disabled={disabled}>
      {text}
    </Button>
  );
};

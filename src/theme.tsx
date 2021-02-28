import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#61dafb',
    },
    secondary: {
      main: '#000',
    },
    text: {
      primary: '#61dafb', 
      secondary: '#61dafb'
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#282c34',
    },
  },
});

export default theme;

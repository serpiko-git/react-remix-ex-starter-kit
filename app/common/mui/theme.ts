import { createTheme } from '@mui/material';
// import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      // main: 'red.A400',
      main: '#FF1744',
    },
  },
});

export default theme;

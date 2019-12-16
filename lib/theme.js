import { grey, indigo, teal } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import Cookie from 'js-cookie';

// Create a theme instance.
export const getTheme = theme => {
  return createMuiTheme({
    palette: {
      type: theme.paletteType,
      primary: {
        default: '#ffff00',
        light: teal[400],
        main: teal[600],
        dark: teal[800],
      },
      secondary: {
        light: indigo[400],
        main: indigo[600],
        dark: indigo[800],
      },
      background: {
        light: theme.paletteType === 'light' ? grey[100] : grey[700],
        dark: theme.paletteType === 'light' ? grey[100] : grey[900],
      },
      text: {
        icon: theme.paletteType === 'light' ? '#757575' : '#fff',
      },
    },
    overrides: {
      MuiPaper: {
        elevation1: {
          boxShadow:
            '0px 1px 2px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(193, 193, 193, 0.14), 0px 1px 1px -1px rgba(0, 0, 0, 0.12), 0 -1px 1px -1px rgba(0, 0, 0, 0.2);',
        },
      },
      MuiCardHeader: {
        avatar: {
          marginRight: 10,
        },
      },
    },
  });
};

const theme = getTheme({
  paletteType: Cookie.get('use_dark_mode') !== 'true' ? 'light' : 'dark',
});

export default theme;

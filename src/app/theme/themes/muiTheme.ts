import { createTheme } from '@mui/material/styles';

import colors from '../definitions/colors';
import { fontFamilies } from '../definitions/typography';

const muiTheme = createTheme({
  palette: {
    error: {
      main: colors.daisy.main,
    },
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.grass.main,
    },
  },
  typography: {
    fontFamily: fontFamilies.join(','),
  },
});

export default muiTheme;

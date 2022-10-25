import type { Theme } from '@mui/material/styles';

import appTheme from './themes/appTheme';
import muiTheme from './themes/muiTheme';

export const defaultTheme: Theme & { app: typeof appTheme } = {
  ...muiTheme,
  app: appTheme,
};

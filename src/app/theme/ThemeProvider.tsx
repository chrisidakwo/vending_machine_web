import './css/index.scss';

import React from 'react';
import { ThemeProvider as BaseThemeProvider } from 'styled-components';

import { defaultTheme, ThemeInterface } from './index';

export interface ThemeProviderProps {
  theme?: ThemeInterface;
  children?: React.ReactChild;
}

export const ThemeProvider = ({ theme = defaultTheme, children }: ThemeProviderProps): JSX.Element => {
  return <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>;
};

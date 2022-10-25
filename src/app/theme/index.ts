import './css/index.scss';
import appTheme from './themes/appTheme';

export interface ThemeInterface {
  app: typeof appTheme;
}

export interface ThemeProps {
  theme: ThemeInterface;
}

export * from './defaultTheme';
export * from './definitions/breakpoints';
export * from './definitions/colors';
export { fontFamilies } from './definitions/typography';
export * from './ThemeProvider';

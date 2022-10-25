import breakpoints from '../definitions/breakpoints';
import colors from '../definitions/colors';
import { fontFamilies, fontWeight } from '../definitions/typography';

const appTheme = {
  colors,
  breakpoints,
  typography: {
    fontFamily: fontFamilies.join(','),
    fontWeight,
  },
  borderRadius: {
    small: '4px',
    large: '8px',
  },
};

export default appTheme;

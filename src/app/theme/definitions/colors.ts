export const COLOR_WHITE = '#FFF';
export const COLOR_BLACK = '#000';

export const COLOR_GREY_LIGHT = '#F5F7F9';
export const COLOR_GREY_LIGHT_DARK = '#D4DBE2';
export const COLOR_GREY_LIGHT_DARKER = '#BDC6CE';
export const COLOR_GREY_LIGHT_DARKEST = '#95A1AC';

export const COLOR_GREY_DARK = '#0A111A';
export const COLOR_GREY_DARK_LIGHT = '#202C39';
export const COLOR_GREY_DARK_LIGHTER = '#434F5C';
export const COLOR_GREY_DARK_LIGHTEST = '#677380';

export const COLOR_GRASS = '#00B68F';
export const COLOR_GRASS_DARK = '#00AA86';
export const COLOR_GRASS_LIGHT_DARK = '#00B775';
export const COLOR_GRASS_DARKER = '#005B3B';
export const COLOR_GRASS_LIGHT = '#F2FBF8';

export const COLOR_SAND = '#FF7F38';
export const COLOR_SAND_DARK = '#E67232';
export const COLOR_SAND_DARKER = '#80401C';
export const COLOR_SAND_LIGHT = '#FFF9F5';

export const COLOR_DAISY = '#FF6360';
export const COLOR_DAISY_DARK = '#E65956';
export const COLOR_DAISY_DARKER = '#803130';
export const COLOR_DAISY_LIGHT = '#FFF7F7';
export const COLOR_DAISY_OPAQUE = '#F3BC9D';

const baseColors = {
  grey: {
    light: {
      main: COLOR_GREY_LIGHT,
      dark: COLOR_GREY_LIGHT_DARK,
      darker: COLOR_GREY_LIGHT_DARKER,
      darkest: COLOR_GREY_LIGHT_DARKEST,
    },
    dark: {
      main: COLOR_GREY_DARK,
      light: COLOR_GREY_DARK_LIGHT,
      lighter: COLOR_GREY_DARK_LIGHTER,
      lightest: COLOR_GREY_DARK_LIGHTEST,
    },
  },
  grass: {
    main: COLOR_GRASS,
    dark: COLOR_GRASS_DARK,
    darker: COLOR_GRASS_DARKER,
    light: COLOR_GRASS_LIGHT,
  },
  sand: {
    main: COLOR_SAND,
    dark: COLOR_SAND_DARK,
    darker: COLOR_SAND_DARKER,
    light: COLOR_SAND_LIGHT,
  },
  daisy: {
    main: COLOR_DAISY,
    dark: COLOR_DAISY_DARK,
    darker: COLOR_DAISY_DARKER,
    light: COLOR_DAISY_LIGHT,
  },
  white: {
    main: COLOR_WHITE,
  },
};

const colors = {
  ...baseColors,
  primary: baseColors.grass.main,
  secondary: baseColors.sand.main,
  font: baseColors.grey.dark.lighter,
};

export default colors;

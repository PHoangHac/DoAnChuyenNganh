import {Dimensions} from 'react-native';
const {WDWidth, WDHeight} = Dimensions.get('window');

export const COLORS = {
  white: '#FFF',
  dark: '#000',
  primary: '#04555c',
  secondary: '#e1e8e9',
  light: '#f9f9f9',
  grey: '#dddedd',
  red: 'red',
  orange: '#f5a623',
};

export const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // Font Sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
};

export const DMS = {
  WDWidth,
  WDHeight,
};

export const FONTS = {
  h1: {fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22},
  body1: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body2, lineHeight: 30},
  body2: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body3, lineHeight: 22},
  body2: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body4, lineHeight: 22},
};

const appTheme = {COLORS, SIZES, FONTS, DMS};

export default appTheme;

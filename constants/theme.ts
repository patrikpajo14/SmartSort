import { Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");
import { moderateScale } from "react-native-size-matters";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const COLORS = {
  light: {
    background: "#ffffff",
    text: "#101400",
    textGray: "#5A5A5A",
    textLightGray: "#ABABAB",
    border: "#E1E1E1",
    primary: "#67A515",
    primaryLight: "#FEFFEF",
    primaryDark: "#34520F",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    icon: "#687076",
    white: "#ffffff",
    yellow: "#EFE708",
    blue: "#2E65FD",
    brown: "#704825",
    red: "#D01229",
    redLight: "#E08282",
    transparent: "transparent",
    success: "#4CC706",
    successLight: "#B1D69B",
    warning: "#CAB108",
    warningLight: "#efe07f",
    danger: "#FF0203",
    dangerLight: "#FAC8C9",
    info: "#349AFF",
    infoLight: "#B3D8FC",
  },
  dark: {
    background: "#ffffff",
    text: "#101400",
    textGray: "#5A5A5A",
    textLightGray: "#ABABAB",
    border: "#E1E1E1",
    primary: "#67A515",
    primaryLight: "#FEFFEF",
    primaryDark: "#34520F",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    icon: "#687076",
    white: "#ffffff",
    yellow: "#EFE708",
    blue: "#2E65FD",
    brown: "#704825",
    red: "#D01229",
    redLight: "#E08282",
    transparent: "transparent",
    success: "#4CC706",
    successLight: "#B1D69B",
    warning: "#CAB108",
    warningLight: "#efe07f",
    danger: "#FF0203",
    dangerLight: "#FAC8C9",
    info: "#349AFF",
    infoLight: "#B3D8FC",
  },
};

export const SIZES = {
  // global sizes
  base: moderateScale(8),
  font: moderateScale(14),
  radius: moderateScale(12),
  padding: moderateScale(24),

  // font sizes
  largeTitle: moderateScale(32),
  h1: moderateScale(24),
  h2: moderateScale(20),
  h3: moderateScale(16),
  h4: moderateScale(13),
  h5: moderateScale(11),
  body1: moderateScale(18),
  body2: moderateScale(16),
  body3: moderateScale(14),
  body4: moderateScale(12),
  body5: moderateScale(11),

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: SIZES.largeTitle,
    fontWeight: "bold",
    lineHeight: SIZES.largeTitle + 2,
  },
  h1: {
    fontFamily: "Poppins-Bold",
    fontSize: SIZES.h1,
    fontWeight: "bold",
    lineHeight: SIZES.h1 + 2,
  },
  h2: {
    fontFamily: "Poppins-Bold",
    fontSize: SIZES.h2,
    fontWeight: "bold",
    lineHeight: SIZES.h2 + 2,
  },
  h3: {
    fontFamily: "Poppins-Bold",
    fontSize: SIZES.h3,
    fontWeight: "bold",
    lineHeight: SIZES.h3 + 2,
  },
  h4: {
    fontFamily: "Poppins-Bold",
    fontSize: SIZES.h4,
    fontWeight: "bold",
    lineHeight: SIZES.h4 + 2,
  },
  h5: {
    fontFamily: "Poppins-Bold",
    fontSize: SIZES.h5,
    fontWeight: "bold",
  },
  body1: {
    fontFamily: "Poppins",
    fontSize: SIZES.body1,
  },
  body2: {
    fontFamily: "Poppins",
    fontSize: SIZES.body2,
  },
  bold2: {
    fontFamily: "Poppins-Bold",
    fontSize: SIZES.body2,
    fontWeight: "bold",
  },
  semiBold1: {
    fontFamily: "Poppins-Semibold",
    fontSize: SIZES.h1,
    fontWeight: 600,
  },
  semiBold2: {
    fontFamily: "Poppins-Semibold",
    fontSize: SIZES.body2,
    fontWeight: 600,
  },
  body3: {
    fontFamily: "Poppins",
    fontSize: SIZES.body3,
  },
  bold3: {
    fontFamily: "Poppins-Bold",
    fontSize: SIZES.body3,
    fontWeight: "bold",
  },
  semiBold3: {
    fontFamily: "Poppins-Semibold",
    fontSize: SIZES.body3,
    fontWeight: 600,
  },
  body4: {
    fontFamily: "Poppins",
    fontSize: SIZES.body4,
  },
  bold4: {
    fontFamily: "Poppins-Bold",
    fontSize: SIZES.body4,
    fontWeight: "bold",
  },
  semiBold4: {
    fontFamily: "Poppins-Semibold",
    fontSize: SIZES.body4,
    fontWeight: 600,
  },
  body5: {
    fontFamily: "Poppins",
    fontSize: SIZES.body5,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;

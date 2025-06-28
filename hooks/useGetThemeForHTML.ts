import { ScaledSheet } from "react-native-size-matters";
import { Platform } from "react-native";
import { COLORS, FONTS } from "@/constants/theme";
const typedColors = COLORS as any;
const useGetThemeForHTML = (mode: string) => {
  const activeColors = typedColors[mode];

  return ScaledSheet.create({
    body: {
      whiteSpace: "normal",
      fontFamily:
        Platform.OS === "android" ? "poppins-regular" : "Poppins-Regular",
      color: activeColors.text,
      textAlign: "left",
      fontSize: "15@ms0.2",
      lineHeight: "22@ms0.2",
      padding: 0,
      margin: 0,
    },
    h1: {
      fontWeight: "bold",
      fontSize: "18@ms",
      lineHeight: "24@ms",
      color: activeColors.text,
      marginBottom: 0,
      fontFamily: Platform.OS === "android" ? "poppins_bold" : "Poppins-Bold",
    },
    h2: {
      fontWeight: "bold",
      fontSize: "16@ms",
      lineHeight: "22@ms",
      color: activeColors.text,
      marginBottom: 0,
      fontFamily: Platform.OS === "android" ? "poppins_bold" : "Poppins-Bold",
    },
    h3: {
      fontWeight: "bold",
      fontSize: "14@ms",
      lineHeight: "20@ms",
      color: activeColors.text,
      marginBottom: 0,
      fontFamily: Platform.OS === "android" ? "poppins_bold" : "Poppins-Bold",
    },
    h4: {
      fontWeight: "bold",
      fontSize: "14@ms",
      lineHeight: "19@ms",
      color: activeColors.text,
      marginBottom: 0,
      fontFamily: Platform.OS === "android" ? "poppins_bold" : "Poppins-Bold",
    },
    h5: {
      fontWeight: "bold",
      fontSize: "14@ms",
      lineHeight: "19@ms",
      color: activeColors.text,
      marginBottom: 0,
      fontFamily: Platform.OS === "android" ? "poppins_bold" : "Poppins-Bold",
    },
    h6: {
      fontWeight: "bold",
      fontSize: "14@ms",
      lineHeight: "19@ms",
      color: activeColors.text,
      marginBottom: 0,
      fontFamily: Platform.OS === "android" ? "poppins_bold" : "Poppins-Bold",
    },
    p: {
      color: activeColors.text,
      fontSize: "15@ms0.3",
      lineHeight: "22@ms0.3",
      marginBottom: 10,
      textAlign: "left",
      position: "relative",
      fontFamily:
        Platform.OS === "android" ? "poppins_regular" : "Poppins-Regular",
    },
    div: {
      color: activeColors.text,
      ...FONTS.body4,
      fontSize: "15@ms0.3",
      lineHeight: "22@ms0.3",
      marginBottom: 10,
      textAlign: "left",
      fontFamily:
        Platform.OS === "android" ? "poppins_regular" : "Poppins-Regular",
    },
    span: {
      color: activeColors.text,
      fontFamily:
        Platform.OS === "android" ? "poppins_regular" : "Poppins-Regular",
    },
    b: {
      fontWeight: "bold",
      fontFamily: Platform.OS === "android" ? "poppins_bold" : "Poppins-Bold",
    },
    strong: {
      fontWeight: "bold",
      fontFamily: Platform.OS === "android" ? "poppins_bold" : "Poppins-Bold",
      margin: 0,
    },
    ul: {
      listStyleType: "none",
      fontFamily:
        Platform.OS === "android" ? "poppins_regular" : "Poppins-Regular",
      color: activeColors.text,
      paddingLeft: 0,
      paddingRight: "15@ms",
    },
    li: {
      fontSize: "14@ms",
      color: activeColors.text,
    },
    a: {
      color: activeColors.primary,
      textDecorationColor: activeColors.primary,
    },
    sub: {
      fontSize: "10@ms",
      textAlignVertical: "bottom",
    },
    em: {
      ...FONTS.italic,
    },
    blockquote: {
      ...FONTS.italic,
      marginHorizontal: 0,
      backgroundColor: activeColors.lightGray,
      padding: "15@ms",
      borderRadius: "5@ms",
    },
  });
};

export default useGetThemeForHTML;

import { View, Text, TextStyle } from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import MainLayout from "@/screen-layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
export default function HomeScreen() {
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];

  return (
    <MainLayout
      contentContainerStyle={{
        paddingHorizontal: moderateScale(20),
      }}
    >
      <View style={styles.textWrap}>
        <View style={styles.titleWrap}>
          <Text style={[styles.title, { color: activeColors.text }]}>
            {t("home.title")}
          </Text>
          <Text style={[styles.title, { color: activeColors.text }]}>
            {"User"}
          </Text>
        </View>
        <Text style={[styles.description, { color: activeColors.text }]}>
          {t("home.description")}
        </Text>
      </View>
    </MainLayout>
  );
}

const styles = ScaledSheet.create({
  textWrap: {
    width: "100%",
    paddingBottom: "20@ms",
  },
  titleWrap: {
    flexDirection: "row",
    gap: 4,
    marginBottom: "5@ms",
  },
  innerContainer: {
    borderRadius: "20@ms",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 20,
    maxHeight: "460@ms",
    marginBottom: "25@ms",
  },
  imageWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "50%",
    minHeight: "650@ms",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  scanImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    ...(FONTS.semiBold1 as TextStyle),
    fontSize: "30@ms",
  },
  description: {
    ...(FONTS.body1 as TextStyle),
  },
});

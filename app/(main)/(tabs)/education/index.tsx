import { Button, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { COLORS } from "@/constants/theme";
import MainLayout from "@/screen-layouts/MainLayout";
import EducationItem from "@/screens/education-screens/components/EducationItem";
import { Image } from "expo-image";

export default function EducationScreen() {
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];

  return (
    <MainLayout
      title={t("education.title")}
      headerContainerStyle={{ paddingHorizontal: moderateScale(20) }}
    >
      <View style={styles.imageWrap}>
        <Image
          style={styles.image}
          source={require("@/assets/images/scan-page-bg.png")}
          contentFit="cover"
        />
      </View>
      <View style={styles.container}>
        <View style={styles.itemList}>
          <EducationItem
            label={"Plastic"}
            onPress={() =>
              router.push({
                pathname: "/(main)/(tabs)/education/[category]",
                params: { category: "plastic" },
              })
            }
          />
          <EducationItem
            label={"Plastic"}
            onPress={() =>
              router.push({
                pathname: "/(main)/(tabs)/education/[category]",
                params: { category: "plastic" },
              })
            }
          />
          <EducationItem
            label={"Plastic"}
            onPress={() =>
              router.push({
                pathname: "/(main)/(tabs)/education/[category]",
                params: { category: "plastic" },
              })
            }
          />
          <EducationItem
            label={"Plastic"}
            onPress={() =>
              router.push({
                pathname: "/(main)/(tabs)/education/[category]",
                params: { category: "plastic" },
              })
            }
          />
          <EducationItem
            label={"Plastic"}
            onPress={() =>
              router.push({
                pathname: "/(main)/(tabs)/education/[category]",
                params: { category: "plastic" },
              })
            }
          />
        </View>
      </View>
    </MainLayout>
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingTop: "40@ms",
    paddingHorizontal: "20@ms",
  },
  itemList: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    gap: "20@ms",
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
});

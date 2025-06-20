import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, SIZES } from "@/constants/theme";
import MainLayout from "@/screen-layouts/MainLayout";
import EducationItem from "@/screens/education-screens/components/EducationItem";
import { Image } from "expo-image";
import { educationList } from "@/constants/config";
import { useEffect } from "react";

export default function EducationScreen() {
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];
  const { category } = useLocalSearchParams();

  console.log("Category", category);

  useEffect(() => {
    if (category) {
      router.push({
        pathname: "/(main)/education/[category]",
        params: { category: category as string },
      });
    }
  }, [category]);

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
          {educationList.map((item) => (
            <EducationItem
              key={item.id}
              label={item.title}
              image={item.icon}
              outerContainerStyle={{
                width: (SIZES.width - 65) / 3,
                height: (SIZES.width - 65) / 3,
              }}
              onPress={() =>
                router.push({
                  pathname: "/(main)/education/[category]",
                  params: { category: item.type },
                })
              }
            />
          ))}
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
    justifyContent: "center",
    width: "100%",
    flexWrap: "wrap",
    gap: "10@ms",
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

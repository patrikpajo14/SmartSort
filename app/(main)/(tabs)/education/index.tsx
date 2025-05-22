import { Button, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { moderateScale } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { COLORS } from "@/constants/theme";
import MainLayout from "@/screen-layouts/MainLayout";

export default function EducationScreen() {
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];

  return (
    <MainLayout
      title={t("education.title")}
      headerContainerStyle={{ paddingHorizontal: moderateScale(20) }}
    >
      <View style={styles.container}>
        <Text>Education screen</Text>
        <Button
          onPress={() =>
            router.push({
              pathname: "/(main)/(tabs)/education/[category]",
              params: { category: "plastic" },
            })
          }
          title={"Plastic"}
        />

        <Button
          onPress={() => router.navigate("/(main)/(tabs)/education/metal")}
          title={"Metal"}
        />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

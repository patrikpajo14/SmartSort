import { StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { COLORS } from "@/constants/theme";
import MainLayout from "@/screen-layouts/MainLayout";

export default function MapScreen() {
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];

  return (
    <MainLayout
      title={"Map"}
      headerContainerStyle={{ paddingHorizontal: moderateScale(20) }}
    >
      <View style={styles.container}>
        <Text>Map screen</Text>
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

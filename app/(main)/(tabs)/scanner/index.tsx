import { View } from "react-native";
import { router } from "expo-router";
import icons from "@/constants/icons";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import MainLayout from "@/screen-layouts/MainLayout";
import { Image } from "expo-image";
import { COLORS } from "@/constants/theme";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useTheme } from "@/context/ThemeContext";

export default function ScannerScreen() {
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];
  return (
    <MainLayout
      title={t("scanner.title")}
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
        <View
          style={[
            styles.innerContainer,
            { backgroundColor: activeColors.background },
          ]}
        >
          <Image
            style={styles.scanImage}
            source={icons.scan_big}
            contentFit="contain"
          />
          <PrimaryButton
            onPress={() => router.navigate("/(main)/(tabs)/scanner/camera")}
            label={t("scanner.cta_label")}
          />
        </View>
      </View>
    </MainLayout>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: "20@ms",
  },
  innerContainer: {
    paddingHorizontal: "45@ms",
    paddingVertical: "50@ms",
    flexDirection: "column",
    alignItems: "center",
    gap: "100@ms",
    borderRadius: "20@ms",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 20,
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
    width: "200@ms",
    height: "200@ms",
  },
});

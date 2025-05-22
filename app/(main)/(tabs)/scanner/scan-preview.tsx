import { Text, TextStyle, View } from "react-native";
import icons from "@/constants/icons";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { Image } from "expo-image";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { router } from "expo-router";
import MainLayout from "@/screen-layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import Badge from "@/components/ui/Badge";

export default function ScanPreviewScreen() {
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];

  return (
    <MainLayout
      title={t("scanner.scan_preview_title")}
      returnIcon={icons.chevron_left}
      headerContainerStyle={{
        paddingHorizontal: moderateScale(20),
        paddingTop: moderateScale(20),
      }}
    >
      <View style={styles.imageWrap}>
        <Image
          style={styles.image}
          source={require("@/assets/images/scan-page-bg.png")}
          contentFit="cover"
        />
      </View>
      <View style={styles.container}>
        <View style={[styles.innerContainer]}>
          <Image
            style={styles.scanImage}
            source={require("@/assets/images/scan-img.png")}
            contentFit="contain"
          />
        </View>
        <View style={{ alignItems: "center", marginBottom: moderateScale(10) }}>
          <Badge label={"Plastic bottle"} />
        </View>
        <Text style={[styles.title, { color: activeColors.text }]}>
          {t("scanner.recyclable")}
        </Text>
        <PrimaryButton
          onPress={() => {
            router.back();
            router.replace("/(main)/(tabs)/map");
          }}
          label={t("scanner.scan_preview_cta")}
        />
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
    ...(FONTS.h1 as TextStyle),
    textAlign: "center",
    paddingBottom: "20@ms",
  },
});

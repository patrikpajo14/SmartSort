import { Text, TextStyle, View } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, FONTS } from "@/constants/theme";
import { ScaledSheet } from "react-native-size-matters";
import { Image } from "expo-image";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function MainAuthScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";
  let activeColors = COLORS[mode ?? "light"];
  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <View style={styles.imageWrap}>
        <Image
          style={[styles.image, { opacity: isDarkMode ? 0.25 : 1 }]}
          source={require("@/assets/images/bg-shape.png")}
          contentFit="cover"
        />
        <View style={styles.logo}>
          <Image
            style={styles.logoImage}
            source={require("@/assets/images/logo.png")}
            contentFit="contain"
            transition={500}
          />
        </View>
      </View>
      <View style={styles.textWrap}>
        <Text style={[styles.title, { color: activeColors.text }]}>
          {t("auth.main_title")}
        </Text>
        <Text style={[styles.description, { color: activeColors.textGray }]}>
          {t("auth.main_description")}
        </Text>
        <PrimaryButton
          onPress={() => router.navigate("/login")}
          label={t("auth.sign_in")}
          outerContainerStyle={{ marginBottom: 15 }}
        />
        <PrimaryButton
          onPress={() => router.navigate("/register")}
          label={t("auth.create_acc")}
          type={"outlined"}
        />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
  },
  textWrap: {
    paddingHorizontal: "20@ms",
    paddingBottom: "80@ms",
  },
  imageWrap: {
    width: "100%",
    height: "50%",
    minHeight: "453@ms",
    marginBottom: "40@ms",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  logo: {
    position: "absolute",
    top: "165@ms",
    width: "100%",
    alignItems: "center",
  },
  logoImage: {
    width: "276@ms",
    height: "163@ms",
  },
  title: {
    ...(FONTS.largeTitle as TextStyle),
    textAlign: "center",
    paddingBottom: "10@ms",
  },
  description: {
    ...(FONTS.body1 as TextStyle),
    textAlign: "center",
    paddingBottom: "40@ms",
  },
});

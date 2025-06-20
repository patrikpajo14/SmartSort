import { Text, TextStyle, View } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, FONTS } from "@/constants/theme";
import { ScaledSheet } from "react-native-size-matters";
import { Image } from "expo-image";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainAuthScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";
  let activeColors = COLORS[mode ?? "light"];
  return (
    <SafeAreaView
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
      <View
        style={[styles.textWrap, { backgroundColor: activeColors.background }]}
      >
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
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  textWrap: {
    paddingHorizontal: "20@ms",
  },
  imageWrap: {
    width: "100%",
    height: "50%",
    minHeight: "440@ms",
    marginBottom: "35@ms",
    marginTop: "-30@ms",
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
    paddingBottom: "30@ms",
  },
});

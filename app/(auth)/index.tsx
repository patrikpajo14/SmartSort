import { Text, TextStyle, View } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, FONTS } from "@/constants/theme";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ScaledSheet } from "react-native-size-matters";
import { Image } from "expo-image";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function MainAuthScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  let activeColors = COLORS[colorScheme ?? "light"];
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image
          style={styles.image}
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
          Explore the app
        </Text>
        <Text style={[styles.description, { color: activeColors.textGray }]}>
          Now your finances are in one place and always under control
        </Text>
        <PrimaryButton
          onPress={() => router.navigate("/login")}
          label={"Sign In"}
          outerContainerStyle={{ marginBottom: 15 }}
        />
        <PrimaryButton
          onPress={() => router.navigate("/register")}
          label={"Create account"}
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

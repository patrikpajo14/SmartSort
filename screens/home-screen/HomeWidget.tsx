import { TextStyle, View, Text, ImageStyle, ViewStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { COLORS, FONTS } from "@/constants/theme";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Image } from "expo-image";
import { useTheme } from "@/context/ThemeContext";

interface HomeWidgetProps {
  title: string;
  buttonText: string;
  onPress: () => void;
  image: string;
  imageStyles?: ImageStyle;
  containerStyles?: ViewStyle;
}

export default function HomeWidget({
  title,
  buttonText,
  onPress,
  image,
  imageStyles,
  containerStyles,
}: HomeWidgetProps) {
  const { mode } = useTheme();
  let activeColors = COLORS[mode];

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: activeColors.border,
          backgroundColor: activeColors.background,
          shadowColor: activeColors.primaryDark,
        },
        containerStyles,
      ]}
    >
      <View style={styles.textWrap}>
        <Text style={[styles.text, { color: activeColors.text }]}>{title}</Text>
        <View style={{ flexDirection: "row" }}>
          <PrimaryButton label={buttonText} onPress={onPress} small={true} />
        </View>
      </View>
      <Image
        style={[styles.image, imageStyles]}
        source={image}
        contentFit={"contain"}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    borderRadius: "14@ms",
    borderWidth: 1,
    padding: "15@ms",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "15@ms",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.11,
    shadowRadius: 15,
    elevation: 15,
    marginBottom: "20@ms",
  },
  textWrap: {
    marginBottom: "5@ms",
    maxWidth: "60%",
  },
  text: {
    ...(FONTS.semiBold2 as TextStyle),
    marginBottom: "12@ms",
  },
  image: {
    width: "120@ms",
    height: "100%",
  },
});

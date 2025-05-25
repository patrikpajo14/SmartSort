import { Text, TextStyle, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import { Image } from "expo-image";

type NoContentProps = {
  title: string;
  description: string;
  icon: string;
};
const NoContent = ({ title, description, icon }: NoContentProps) => {
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <Image
        source={icon}
        style={styles.icon}
        tintColor={activeColors.primary}
      />
      <Text style={[styles.title, { color: activeColors.text }]}>{title}</Text>
      <Text style={[styles.description, { color: activeColors.text }]}>
        {description}
      </Text>
    </View>
  );
};
export const styles = ScaledSheet.create({
  container: {
    paddingVertical: "20@ms0.2",
    paddingHorizontal: "30@ms0.2",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: "35@ms0.2",
    height: "40@ms0.2",
    objectFit: "contain",
    marginBottom: "10@ms0.2",
  },
  title: {
    ...(FONTS.h2 as TextStyle),
    fontSize: "18@ms0.2",
    lineHeight: "24@ms0.2",
    marginBottom: "10@ms0.2",
    textAlign: "center",
  },
  description: {
    ...(FONTS.body1 as TextStyle),
    fontSize: "13@ms0.2",
    lineHeight: "20@ms0.2",
    textAlign: "center",
  },
});
export default NoContent;

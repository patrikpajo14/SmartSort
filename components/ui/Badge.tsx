import React from "react";
import { Text, View, ViewStyle, TextStyle } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, FONTS } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { getContainerColor } from "@/utils/mapThemePickers";

type BadgeProps = {
  label: string;
  category: string;
  labelStyle?: TextStyle;
  outerContainerStyle?: ViewStyle;
};

const Badge: React.FC<BadgeProps> = ({
  label,
  category,
  labelStyle,
  outerContainerStyle,
}) => {
  const { mode } = useTheme();
  console.log("BADGE CATEGORY", category);
  let activeColors = COLORS[mode ?? "light"];
  const backgroundColor = getContainerColor(activeColors, category);
  const color =
    category === "plastic" ? activeColors?.brown : activeColors?.white;

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: moderateScale(30, 0.2),
        paddingHorizontal: moderateScale(15, 0.2),
        backgroundColor: backgroundColor,
        borderRadius: 15,
        ...outerContainerStyle,
      }}
    >
      <Text
        style={{
          ...(FONTS.body5 as TextStyle),
          fontWeight: "500",
          color: color,
          textTransform: "capitalize",
          ...labelStyle,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default Badge;

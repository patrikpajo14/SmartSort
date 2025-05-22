import React from "react";
import { Text, View, ViewStyle, TextStyle } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, FONTS } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";

type BadgeProps = {
  label: string;
  labelStyle?: TextStyle;
  outerContainerStyle?: ViewStyle;
};

const Badge: React.FC<BadgeProps> = ({
  label,
  labelStyle,
  outerContainerStyle,
}) => {
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];
  const backgroundColor = activeColors?.yellow;
  const color = activeColors?.textGray;

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: moderateScale(32, 0.2),
        paddingHorizontal: moderateScale(15, 0.2),
        backgroundColor: backgroundColor,
        borderRadius: 17,
        ...outerContainerStyle,
      }}
    >
      <Text
        style={{
          ...(FONTS.semiBold2 as TextStyle),
          fontSize: moderateScale(13, 0.2),
          color: color,
          ...labelStyle,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default Badge;

import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import { Switch, Text, TextStyle, View, ViewStyle } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import React from "react";

interface SingleSwitchProps {
  toggleSwitch: () => void;
  isEnabled: boolean;
  title: string;
  linkContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

export const SingleSwitch = ({
  toggleSwitch,
  isEnabled,
  title,
  linkContainerStyle,
  labelStyle,
}: SingleSwitchProps): JSX.Element => {
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: verticalScale(50),
        ...linkContainerStyle,
      }}
    >
      <Text
        style={{ ...FONTS.body1, fontSize: moderateScale(14), ...labelStyle }}
      >
        {title}
      </Text>
      <Switch
        trackColor={{
          false: activeColors.textGray,
          true: activeColors.primary,
        }}
        thumbColor={activeColors.white}
        ios_backgroundColor={
          !isEnabled ? activeColors.white : activeColors.primary
        }
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

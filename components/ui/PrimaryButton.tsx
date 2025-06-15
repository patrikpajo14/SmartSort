import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, FONTS } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";

type PrimaryButtonProps = {
  label: string;
  labelStyle?: TextStyle;
  disabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
  prependComponent?: React.ReactNode;
  appendComponent?: React.ReactNode;
  outerContainerStyle?: ViewStyle;
  type?: "outlined" | "primary";
  small?: boolean;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  labelStyle,
  disabled,
  isLoading,
  onPress,
  prependComponent,
  appendComponent,
  outerContainerStyle,
  type = "primary",
  small = false,
}) => {
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      onPress={onPress}
      style={{ opacity: disabled || isLoading ? 0.5 : 1 }}
    >
      <View
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: activeColors.primary,
          backgroundColor:
            type === "outlined"
              ? activeColors.transparent
              : activeColors.primary,
          ...outerContainerStyle,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            height: small ? moderateScale(45, 0.2) : moderateScale(53, 0.2),
            paddingHorizontal: small
              ? moderateScale(15, 0.2)
              : moderateScale(25, 0.2),
            position: "relative",
          }}
        >
          {prependComponent}
          <ActivityIndicator
            color={activeColors.white}
            style={{ position: "absolute", opacity: isLoading ? 1 : 0 }}
          />
          <Text
            style={{
              ...(FONTS.semiBold2 as TextStyle),
              textAlign: "center",
              fontSize: small ? moderateScale(16, 0.2) : moderateScale(20, 0.2),
              lineHeight: small
                ? moderateScale(20, 0.2)
                : moderateScale(24, 0.2),
              color:
                type === "outlined" ? activeColors.primary : activeColors.white,
              opacity: isLoading ? 0 : 1,
              ...labelStyle,
            }}
          >
            {label}
          </Text>
          {appendComponent}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

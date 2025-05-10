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
import { useColorScheme } from "@/hooks/useColorScheme";
import { COLORS, FONTS } from "@/constants/theme";

type PrimaryButtonProps = {
  label: string;
  labelStyle?: TextStyle;
  disabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
  prependComponent?: React.ReactNode;
  appendComponent?: React.ReactNode;
  outerContainerStyle?: ViewStyle;
  type?: string;
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
}) => {
  const colorScheme = useColorScheme();
  let activeColors = COLORS[colorScheme ?? "light"];
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
            height: moderateScale(53, 0.2),
            paddingHorizontal: moderateScale(25, 0.2),
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
              fontSize: moderateScale(20, 0.2),
              lineHeight: moderateScale(24, 0.2),
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

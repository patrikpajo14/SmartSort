import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, FONTS } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Image } from "expo-image";
import icons from "@/constants/icons";

type EducationItemProps = {
  label: string;
  labelStyle?: TextStyle;
  disabled?: boolean;
  onPress: () => void;
  outerContainerStyle?: ViewStyle;
  type?: "outlined" | "primary";
  small?: boolean;
};

const EducationItem: React.FC<EducationItemProps> = ({
  label,
  labelStyle,
  disabled,
  onPress,
  outerContainerStyle,
  type = "primary",
  small = false,
}) => {
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <View
        style={{
          borderRadius: 20,
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
            flexDirection: "column",
            height: small ? moderateScale(60, 0.2) : moderateScale(100, 0.2),
            width: small ? moderateScale(60, 0.2) : moderateScale(100, 0.2),
            position: "relative",
          }}
        >
          <Image
            source={icons.recycle}
            contentFit={"contain"}
            style={{
              width: moderateScale(30),
              height: moderateScale(30),
            }}
          />
          <Text
            style={{
              ...(FONTS.semiBold4 as TextStyle),
              fontSize: small ? moderateScale(13, 0.2) : moderateScale(14, 0.2),
              lineHeight: small
                ? moderateScale(20, 0.2)
                : moderateScale(24, 0.2),
              color:
                type === "outlined" ? activeColors.primary : activeColors.white,
              paddingTop: moderateScale(3),
              ...labelStyle,
            }}
          >
            {label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EducationItem;

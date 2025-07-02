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
import { Education } from "@/types/global";
import Icons from "@/constants/icons";
import icons from "@/constants/icons";

type EducationItemProps = {
  item: Education;
  labelStyle?: TextStyle;
  disabled?: boolean;
  onPress: () => void;
  outerContainerStyle?: ViewStyle;
  type?: "outlined" | "primary";
  small?: boolean;
  educationStyles?: ViewStyle;
};

const categoryIcons: Record<Education["category"], any> = {
  plastic: icons.bottle,
  glass: icons.glass,
  paper: icons.paper,
  metal: icons.metal,
  batteries: icons.batteries,
  electronics: icons.electronics,
  bio: icons.bio,
  construction: icons.construction,
};

const EducationItem: React.FC<EducationItemProps> = ({
  item,
  labelStyle,
  disabled,
  onPress,
  outerContainerStyle,
  type = "primary",
  small = false,
  educationStyles,
}) => {
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];

  const icon = categoryIcons[item?.category] || icons.education;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[{ opacity: disabled ? 0.5 : 1 }, educationStyles]}
    >
      <View
        style={{
          borderRadius: 20,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          borderColor: activeColors.primary,
          height: small ? moderateScale(60, 0.2) : moderateScale(100, 0.2),
          width: small ? moderateScale(60, 0.2) : moderateScale(100, 0.2),
          backgroundColor:
            type === "outlined"
              ? activeColors.transparent
              : activeColors.primary,
          ...outerContainerStyle,
        }}
      >
        <Image
          source={icon}
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
            lineHeight: small ? moderateScale(20, 0.2) : moderateScale(24, 0.2),
            color:
              type === "outlined" ? activeColors.primary : activeColors.white,
            paddingTop: moderateScale(3),
            ...labelStyle,
          }}
        >
          {item?.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EducationItem;

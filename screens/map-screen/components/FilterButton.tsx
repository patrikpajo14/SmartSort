import React from "react";
import { Text, TextStyle, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { FONTS } from "@/constants/theme";

type FilterButtonProps = {
  text: string;
  onPress: () => void;
  activeColors: any;
  active: boolean;
};
const FilterButton = ({
  text,
  onPress,
  activeColors,
  active,
}: FilterButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          borderColor: activeColors.primary,
          backgroundColor: active
            ? activeColors.primary
            : activeColors.background,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: active ? activeColors.white : activeColors.text },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const styles = ScaledSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: "18@ms",
    height: "35@ms",
    paddingHorizontal: "15@ms",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...(FONTS.body2 as TextStyle),
  },
});
export default FilterButton;

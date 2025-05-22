import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { COLORS } from "@/constants/theme";
import { Image } from "expo-image";
import icons from "@/constants/icons";
import { useTheme } from "@/context/ThemeContext";

type MainButtonProps = {
  onPress: () => void;
  width: number;
};

export const MainButton: FC<MainButtonProps> = ({ onPress, width }) => {
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];

  return (
    <View style={[styles.container, { width }]}>
      <TouchableOpacity style={[styles.button, { width }]} onPress={onPress}>
        <Image source={icons.scan} style={styles.mainIcon} />
        <View
          style={[
            styles.backgroundIcon,
            { backgroundColor: activeColors.white },
          ]}
        ></View>
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: "relative",
  },
  button: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    top: "-25@ms0.2",
    zIndex: 2,
  },
  mainIcon: {
    width: "24@ms0.2",
    height: "24@ms0.2",
    objectFit: "contain",
    zIndex: 2,
    marginRight: "0.5@ms",
    marginBottom: "3@ms",
  },
  backgroundIcon: {
    width: "65@ms0.2",
    height: "65@ms0.2",
    objectFit: "contain",
    position: "absolute",
    bottom: "-7@ms0.2",
    borderRadius: "50%",
  },
});

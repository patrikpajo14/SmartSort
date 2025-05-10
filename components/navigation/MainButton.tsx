import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useColorScheme } from "@/hooks/useColorScheme";
import { COLORS } from "@/constants/theme";
import { Image } from "expo-image";
import icons from "@/constants/icons";

type MainButtonProps = {
  onPress: () => void;
  width: number;
};

export const MainButton: FC<MainButtonProps> = ({ onPress, width }) => {
  const colorScheme = useColorScheme();
  let activeColors = COLORS[colorScheme ?? "light"];

  return (
    <View style={[styles.container, { width }]}>
      <TouchableOpacity style={[styles.button, { width }]} onPress={onPress}>
        <Image source={icons.scan} style={styles.mainIcon} />
        <View style={styles.backgroundIcon}></View>
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
    width: "61@ms0.2",
    height: "61@ms0.2",
    objectFit: "contain",
    position: "absolute",
    bottom: "-5@ms0.2",
    backgroundColor: "#fff",
    borderRadius: "50%",
  },
});

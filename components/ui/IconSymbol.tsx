import React from "react";
import { StyleProp } from "react-native";
import { Image } from "expo-image";
import { ImageStyle as RNImageStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: string;
  size?: number;
  color: string;
  style?: StyleProp<RNImageStyle>;
}) {
  return (
    <Image
      source={name}
      style={[style, { width: size }]}
      tintColor={color}
      contentFit={"contain"}
    />
  );
}

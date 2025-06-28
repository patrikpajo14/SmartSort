import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { COLORS } from "@/constants/theme";

const Spinner = () => {
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  return (
    <View
      style={[
        styles.container,
        styles.horizontal,
        { backgroundColor: activeColors.background },
      ]}
    >
      <ActivityIndicator size="large" color={activeColors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Spinner;

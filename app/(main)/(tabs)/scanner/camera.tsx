import { Button, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <Text>Camera screen</Text>
      <Button
        onPress={() => router.navigate("/(main)/(tabs)/scanner/scan-preview")}
        title={"Camera Preview"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

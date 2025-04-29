import { Button, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

export default function ScannerScreen() {
  return (
    <View style={styles.container}>
      <Text>Scanner screen</Text>
      <Button
        onPress={() => router.navigate("/(main)/(tabs)/scanner/camera")}
        title={"Camera Screen"}
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

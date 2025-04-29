import { StyleSheet, Text, View } from "react-native";

export default function ScanPreviewScreen() {
  return (
    <View style={styles.container}>
      <Text>Scan Preview screen</Text>
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

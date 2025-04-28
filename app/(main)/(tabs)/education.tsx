import { StyleSheet, Text, View } from "react-native";

export default function EducationScreen() {
  return (
    <View style={styles.container}>
      <Text>Education screen</Text>
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

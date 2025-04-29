import { Button, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

export default function EducationScreen() {
  return (
    <View style={styles.container}>
      <Text>Education screen</Text>
      <Button
        onPress={() =>
          router.push({
            pathname: "/(main)/(tabs)/education/[category]",
            params: { category: "plastic" },
          })
        }
        title={"Plastic"}
      />

      <Button
        onPress={() => router.navigate("/(main)/(tabs)/education/metal")}
        title={"Metal"}
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

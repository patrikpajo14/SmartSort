import { Button, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Settings screen</Text>
      <Button
        onPress={() => router.navigate("/settings/explore")}
        title={"Explore"}
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

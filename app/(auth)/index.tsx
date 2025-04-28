import { Button, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function MainAuthScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Main first screen</Text>
      <Button onPress={() => router.navigate("/login")} title={"Login"} />
      <Button onPress={() => router.navigate("/register")} title={"Register"} />
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

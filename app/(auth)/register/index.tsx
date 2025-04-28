import { Button, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Register screen</Text>
      <Button onPress={() => router.navigate("/")} title={"Back"} />
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

import { Button, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/context/AuthContext";

export default function LoginScreen() {
  const { signIn } = useSession();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Login screen</Text>
      <Text
        onPress={() => {
          signIn();
          router.replace("/(main)/(tabs)");
        }}
      >
        Sign In
      </Text>
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

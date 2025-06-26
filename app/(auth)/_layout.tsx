import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";
import { useAuthContext } from "@/context/auth/authContext";
export default function AuthLayout() {
  const { session, isStorageLoading } = useAuthContext();

  if (isStorageLoading) {
    return <Text>Loading...</Text>;
  }

  if (session) {
    return <Redirect href="/(main)/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="register/index" options={{ headerShown: false }} />
    </Stack>
  );
}

import { Redirect, router, Stack } from "expo-router";
import { useSession } from "@/context/AuthContext";
import { Text } from "react-native";
export default function AuthLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (session) {
    return <Redirect href="/(main)/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="/index" options={{ headerShown: false }} />
      <Stack.Screen name="/login/index" options={{ headerShown: false }} />
      <Stack.Screen name="/register/index" options={{ headerShown: false }} />
    </Stack>
  );
}

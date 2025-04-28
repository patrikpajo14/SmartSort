import { Redirect, Stack } from "expo-router";
export default function AuthLayout() {
  const isAuthenticated = true;
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="/index" options={{ headerShown: false }} />
      <Stack.Screen name="/login/index" options={{ headerShown: false }} />
      <Stack.Screen name="/register/index" options={{ headerShown: false }} />
    </Stack>
  );
}

import { Redirect, Stack } from "expo-router";
export default function MainLayout() {
  const isAuthenticated = true;
  if (!isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

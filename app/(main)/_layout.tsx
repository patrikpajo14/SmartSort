import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";
import { useAuthContext } from "@/context/auth/authContext";
export default function MainLayout() {
  const { session, isStorageLoading } = useAuthContext();

  if (isStorageLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="scanner/camera" />
      <Stack.Screen name="scanner/scan-preview" />
      <Stack.Screen name="education/[category]" />
    </Stack>
  );
}

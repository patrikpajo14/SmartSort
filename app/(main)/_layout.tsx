import { Redirect, Stack } from "expo-router";
import { useSession } from "@/context/AuthContext";
import { Text } from "react-native";
export default function MainLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
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

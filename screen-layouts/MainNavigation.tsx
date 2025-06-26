import { Stack } from "expo-router";
import useInitializeHeaders from "@/hooks/useIntializeHeaders";
export default function MainNavigation() {
  useInitializeHeaders();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(main)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

import { Stack } from "expo-router";

export default function ScannerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="camera"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="scan-preview"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}

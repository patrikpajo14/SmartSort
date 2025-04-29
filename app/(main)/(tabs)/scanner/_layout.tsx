import { Stack } from "expo-router";
import { Button } from "react-native";
import { useSession } from "@/context/AuthContext";

export default function ScannerLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Scanner",
        }}
      />
      <Stack.Screen name="camera" options={{ title: "Camera" }} />
      <Stack.Screen name="scan-preview" options={{ title: "Scan preview" }} />
    </Stack>
  );
}

import { Stack } from "expo-router";
import { Button } from "react-native";
import { useSession } from "@/context/AuthContext";

export default function EducationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

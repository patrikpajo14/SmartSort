import { Stack } from "expo-router";
import { Button } from "react-native";
import { useSession } from "@/context/AuthContext";

export default function EducationLayout() {
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
          title: "Education",
        }}
      />
      <Stack.Screen name="[category]" options={{ title: "Plastic" }} />
    </Stack>
  );
}

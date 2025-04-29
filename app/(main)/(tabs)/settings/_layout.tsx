import { Stack } from "expo-router";
import { Button } from "react-native";
import { useSession } from "@/context/AuthContext";

export default function RootLayout() {
  const { signOut } = useSession();
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
          title: "Settings",
          headerRight: () =>
            signOut ? <Button onPress={signOut} title={"Sign out"} /> : null,
        }}
      />
      <Stack.Screen name="language" options={{ title: "Language" }} />
    </Stack>
  );
}

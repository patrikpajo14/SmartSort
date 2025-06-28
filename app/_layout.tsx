import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/auth/authContext";
import MainNavigation from "@/screen-layouts/MainNavigation";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient, asyncStoragePersister } from "@/utils/reactQueryClient";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/utils/toastConfig";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/poppins_regular.ttf"),
    "Poppins-Italic": require("../assets/fonts/poppins_italic.ttf"),
    "Poppins-Light": require("../assets/fonts/poppins_light.ttf"),
    "Poppins-Bold": require("../assets/fonts/poppins_bold.ttf"),
    "Poppins-Semibold": require("../assets/fonts/poppins_semiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <BottomSheetModalProvider>
              <ThemeProvider>
                <MainNavigation />
                <StatusBar style="auto" />
                <Toast config={toastConfig} />
              </ThemeProvider>
            </BottomSheetModalProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    </PersistQueryClientProvider>
  );
}

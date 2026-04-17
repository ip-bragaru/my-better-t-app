import "../global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppProviders } from "@core/providers/app-providers";
import { FONT_FAMILIES } from "@shared/config/fonts";
import { getThemeClassName } from "@shared/config/design-tokens";
import { cn } from "@shared/lib/cn";

function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="post/[postId]" options={{ headerShown: false }} />
      <Stack.Screen
        name="+not-found"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerTitle: () => (
            <Text className="text-[length:var(--typography-md-font-size)] text-[var(--color-text-primary)] font-semibold">
              Not Found
            </Text>
          ),
        }}
      />
    </Stack>
  );
}

function AppShell() {
  return (
    <GestureHandlerRootView className={cn("flex-1", getThemeClassName())}>
      <StatusBar style="dark" animated />
      <AppProviders>
        <StackLayout />
      </AppProviders>
    </GestureHandlerRootView>
  );
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    [FONT_FAMILIES.bold]: require("../assets/fonts/manrope/Manrope-Bold.ttf"),
    [FONT_FAMILIES.medium]: require("../assets/fonts/manrope/Manrope-Medium.ttf"),
    [FONT_FAMILIES.semiBold]: require("../assets/fonts/manrope/Manrope-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppShell />
  );
}

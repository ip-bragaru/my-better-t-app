import "../global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppProviders } from "@core/providers/app-providers";
import { AppThemeProvider } from "@contexts/app-theme-context";
import { FONT_FAMILIES } from "@shared/config/fonts";

function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="post/[postId]"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerTitle: () => <Text className="text-base text-neutral-950 font-semibold">Post</Text>,
        }}
      />
      <Stack.Screen
        name="+not-found"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerTitle: () => (
            <Text className="text-base text-neutral-950 font-semibold">Not Found</Text>
          ),
        }}
      />
    </Stack>
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
    <GestureHandlerRootView className="flex-1">
      <AppThemeProvider>
        <HeroUINativeProvider config={{ devInfo: { stylingPrinciples: false } }}>
          <AppProviders>
            <StackLayout />
          </AppProviders>
        </HeroUINativeProvider>
      </AppThemeProvider>
    </GestureHandlerRootView>
  );
}

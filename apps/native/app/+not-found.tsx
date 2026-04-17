import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";

import { Button } from "@shared/ui/button";
import { ScreenContainer } from "@shared/ui/screen-container";
import { SadMascotIllustration } from "@shared/ui/sad-mascot-illustration";
import { SurfaceCard } from "@shared/ui/surface-card";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenContainer>
        <SafeAreaView edges={["top"]} className="flex-1 pt-[var(--space-xl)]">
          <SurfaceCard className="flex-1 px-[var(--component-layout-card-padding)] pb-[var(--component-layout-panel-padding)]">
            <View className="flex-1 w-full items-center justify-center gap-[var(--space-md)] pt-[var(--space-control)]">
              <SadMascotIllustration width={112} height={112} />
              <Text className="text-center text-[18px] leading-[26px] tracking-[0px] text-[var(--color-text-primary)] font-bold lining-nums tabular-nums stacked-fractions">
                По вашему запросу ничего не найдено
              </Text>
              <Link href="/" asChild>
                <Button
                  label="На главную"
                  size="md"
                  fullWidth
                />
              </Link>
            </View>
          </SurfaceCard>
        </SafeAreaView>
      </ScreenContainer>
    </>
  );
}

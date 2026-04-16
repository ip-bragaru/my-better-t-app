import { Link, Stack } from "expo-router";
import { Surface } from "heroui-native";
import { Text, View } from "react-native";

import { Container } from "@components/container";
import { Button } from "@shared/ui/button";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <Container>
        <View className="flex-1 justify-center items-center p-4">
          <Surface variant="secondary" className="items-center p-6 max-w-sm rounded-lg">
            <Text className="text-4xl mb-3 font-medium">🤔</Text>
            <Text className="text-foreground text-lg mb-1 font-medium">Page Not Found</Text>
            <Text className="text-muted text-sm text-center mb-4 font-medium">
              The page you're looking for doesn't exist.
            </Text>
            <Link href="../" asChild>
              <Button label="Go Home" size="sm" />
            </Link>
          </Surface>
        </View>
      </Container>
    </>
  );
}

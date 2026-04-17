import { View } from "react-native";

import { SkeletonBlock } from "@shared/ui/skeleton-block";
import { SurfaceCard } from "@shared/ui/surface-card";

export function FeedSkeleton() {
  return (
    <View className="gap-[var(--component-layout-card-padding)]">
      {Array.from({ length: 3 }, (_, index) => (
        <SurfaceCard key={index} className="overflow-hidden">
          <SkeletonBlock className="h-[200px] w-full" />
          <View className="gap-[var(--component-layout-card-padding)] p-[var(--component-layout-panel-padding)]">
            <View className="flex-row items-center gap-[var(--space-sm)]">
              <SkeletonBlock className="h-11 w-11 rounded-full" />
              <View className="flex-1 gap-[var(--space-xs)]">
                <SkeletonBlock className="h-3 w-40" />
                <SkeletonBlock className="h-[10px] w-[100px]" />
              </View>
            </View>
            <SkeletonBlock className="h-4 w-[65%]" />
            <SkeletonBlock className="h-3 w-full" />
            <SkeletonBlock className="h-3 w-[88%]" />
          </View>
        </SurfaceCard>
      ))}
    </View>
  );
}

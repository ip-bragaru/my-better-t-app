import { View } from "react-native";

import { SkeletonBlock } from "@shared/ui/skeleton-block";
import { SurfaceCard } from "@shared/ui/surface-card";

export function FeedSkeleton() {
  return (
    <View className="gap-4">
      {Array.from({ length: 3 }, (_, index) => (
        <SurfaceCard key={index} className="overflow-hidden">
          <SkeletonBlock className="h-[200px] w-full" />
          <View className="gap-4 p-5">
            <View className="flex-row items-center gap-3">
              <SkeletonBlock className="h-11 w-11 rounded-full" />
              <View className="flex-1 gap-2">
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

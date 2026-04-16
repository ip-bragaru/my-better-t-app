import { View } from "react-native";

import { SkeletonBlock } from "@shared/ui/skeleton-block";

export function PostDetailSkeleton() {
  return (
    <View className="gap-4">
      {/* Full-bleed cover placeholder — mirrors the -mx-5 -mt-5 in DetailPostHeader */}
      <SkeletonBlock className="aspect-square w-full rounded-none" />
      <View className="gap-4 px-5">
        <View className="flex-row items-center gap-3">
          <SkeletonBlock className="h-[38px] w-[38px] rounded-full" />
          <SkeletonBlock className="h-3 w-[140px]" />
        </View>
        <SkeletonBlock className="h-9 w-[80%] rounded-lg" />
        <View className="gap-2">
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-[94%]" />
          <SkeletonBlock className="h-3 w-[88%]" />
        </View>
        <View className="flex-row gap-2">
          <SkeletonBlock className="h-8 w-[72px] rounded-full" />
          <SkeletonBlock className="h-8 w-[72px] rounded-full" />
        </View>
      </View>
    </View>
  );
}

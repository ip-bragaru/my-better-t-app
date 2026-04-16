import { View } from "react-native";

import { SkeletonBlock } from "@shared/ui/skeleton-block";

export function PostDetailSkeleton() {
  return (
    <View className="gap-5 px-5 py-6">
      <SkeletonBlock className="h-[260px] w-full rounded-[28px]" />
      <View className="flex-row items-center gap-3">
        <SkeletonBlock className="h-[46px] w-[46px] rounded-full" />
        <View className="gap-2">
          <SkeletonBlock className="h-3 w-[140px]" />
          <SkeletonBlock className="h-[10px] w-[100px]" />
        </View>
      </View>
      <SkeletonBlock className="h-[18px] w-[70%]" />
      <SkeletonBlock className="h-3 w-full" />
      <SkeletonBlock className="h-3 w-[94%]" />
      <SkeletonBlock className="h-3 w-[88%]" />
    </View>
  );
}

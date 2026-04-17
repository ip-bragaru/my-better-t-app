import { View } from "react-native";

import { SkeletonBlock } from "@shared/ui/skeleton-block";
import { SurfaceCard } from "@shared/ui/surface-card";

const skeletonItems = Array.from({ length: 3 }, (_, i) => i);

export function FeedSkeleton() {
  return (
    <View className="gap-[var(--component-layout-card-padding)]">
      {skeletonItems.map((index) => (
        <FeedPostCardSkeleton key={index} />
      ))}
    </View>
  );
}

function FeedPostCardSkeleton() {
  return (
    <SurfaceCard className="-mx-[var(--component-layout-card-padding)] overflow-hidden gap-[var(--space-xs)] px-[var(--component-layout-card-padding)] ">
      {/* Author row — matches PostAuthorRow with avatarSize="sm" */}
      <View className="flex-row items-center gap-[var(--space-sm)] py-[var(--space-sm)]">
        <SkeletonBlock className="h-[var(--component-avatar-size-sm)] w-[var(--component-avatar-size-sm)] rounded-full" />
        <SkeletonBlock className="h-[13px] w-[140px] rounded-full" />
      </View>

      {/* Cover image — full-bleed, same -mx offset as PostImage in FeedPostCard */}
      <View className="-mx-[var(--component-layout-card-padding)] mt-[var(--space-xs)]">
        <SkeletonBlock className="aspect-square w-full rounded-none" />
      </View>

      {/* Text block — title (typography lg) + 3 body lines (typography md) */}
      <View className="gap-[var(--space-xs)]">
        <SkeletonBlock className="h-[18px] w-[68%] rounded-full" />
        <SkeletonBlock className="h-[14px] w-full rounded-full" />
        <SkeletonBlock className="h-[14px] w-[90%] rounded-full" />
        <SkeletonBlock className="h-[14px] w-[72%] rounded-full" />
      </View>

      {/* Stats row — two ActionChip sm pill shapes */}
      <View className="flex-row items-center gap-[var(--space-sm)]">
        <SkeletonBlock className="h-[30px] w-[58px] rounded-full" />
        <SkeletonBlock className="h-[30px] w-[58px] rounded-full" />
      </View>
    </SurfaceCard>
  );
}

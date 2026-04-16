import { Pressable } from "react-native";

import { SurfaceCard } from "@shared/ui/surface-card";
import { cn } from "@shared/lib/cn";

type PostCardProps = {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
};

export function PostCard({ children, onPress, className }: PostCardProps) {
  if (!onPress) {
    return <SurfaceCard className={cn("overflow-hidden", className)}>{children}</SurfaceCard>;
  }

  return (
    <Pressable onPress={onPress}>
      <SurfaceCard className={cn("overflow-hidden", className)}>{children}</SurfaceCard>
    </Pressable>
  );
}

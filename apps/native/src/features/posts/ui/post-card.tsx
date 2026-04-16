import { Pressable } from "react-native";

import { SurfaceCard } from "@shared/ui/surface-card";

type PostCardProps = {
  children: React.ReactNode;
  onPress?: () => void;
};

export function PostCard({ children, onPress }: PostCardProps) {
  if (!onPress) {
    return <SurfaceCard className="overflow-hidden">{children}</SurfaceCard>;
  }

  return (
    <Pressable onPress={onPress}>
      <SurfaceCard className="overflow-hidden">{children}</SurfaceCard>
    </Pressable>
  );
}

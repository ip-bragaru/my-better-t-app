import { DESIGN_TOKENS } from "@shared/config/design-tokens";
import { cn } from "@shared/lib/cn";
import { RemoteImage } from "@shared/ui/remote-image";

type PostImageProps = {
  uri: string;
  alt: string;
  height?: number;
  rounded?: number;
};

export function PostImage({
  uri,
  alt,
  height = DESIGN_TOKENS.size.post.coverHeight,
  rounded = DESIGN_TOKENS.radius.xl,
}: PostImageProps) {
  const className = getPostImageClassName(height, rounded);

  return (
    <RemoteImage
      uri={uri}
      alt={alt}
      className={className}
    />
  );
}

function getPostImageClassName(height: number, rounded: number) {
  const heightClassName = (() => {
    switch (height) {
      case 220:
        return "h-[220px]";
      case 236:
        return "h-[236px]";
      case 260:
        return "h-[260px]";
      default:
        return "h-[220px]";
    }
  })();

  const roundedClassName = (() => {
    switch (rounded) {
      case 0:
        return "rounded-none";
      case 28:
        return "rounded-[28px]";
      default:
        return "rounded-[28px]";
    }
  })();

  return cn("w-full", heightClassName, roundedClassName);
}

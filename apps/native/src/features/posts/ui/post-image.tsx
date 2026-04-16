import { DESIGN_TOKENS } from "@shared/config/design-tokens";
import { cn } from "@shared/lib/cn";
import { RemoteImage } from "@shared/ui/remote-image";

type PostImageProps = {
  uri: string;
  alt: string;
  rounded?: number;
};

export function PostImage({
  uri,
  alt,
  rounded = DESIGN_TOKENS.radius.xl,
}: PostImageProps) {
  const roundedClassName = rounded === 0 ? "rounded-none" : "rounded-[28px]";

  return (
    <RemoteImage
      uri={uri}
      alt={alt}
      resizeMode="cover"
      className={cn("w-full aspect-square", roundedClassName)}
    />
  );
}

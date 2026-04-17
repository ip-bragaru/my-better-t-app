import { cn } from "@shared/lib/cn";
import { RemoteImage } from "@shared/ui/remote-image";

type PostImageProps = {
  uri: string;
  alt: string;
  rounded?: "none" | "card";
  className?: string;
};

export function PostImage({
  uri,
  alt,
  rounded = "card",
  className,
}: PostImageProps) {
  const roundedClassName =
    rounded === "none" ? "rounded-none" : "rounded-[var(--component-image-post-radius)]";

  return (
    <RemoteImage
      uri={uri}
      alt={alt}
      resizeMode="cover"
      className={cn("aspect-square w-full", roundedClassName, className)}
    />
  );
}

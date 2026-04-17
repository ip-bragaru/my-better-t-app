import Svg, { Path, type SvgProps } from "react-native-svg";

type HeartFilledIconProps = Omit<SvgProps, "width" | "height"> & {
  color?: string;
};

export function HeartFilledIcon({
  color = "#FF2B75",
  ...props
}: HeartFilledIconProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M5.89429 13.3001L11.1882 18.2425C11.408 18.4475 11.698 18.5618 11.9998 18.5618C12.3015 18.5618 12.5916 18.4475 12.8113 18.2425L18.1052 13.3001C18.9958 12.471 19.4998 11.3079 19.4998 10.0921V9.92215C19.4998 7.8743 18.0203 6.12821 16.0017 5.79129C14.6658 5.56864 13.3064 6.00516 12.3513 6.96024L11.9998 7.3118L11.6482 6.96024C10.6931 6.00516 9.33374 5.56864 7.9978 5.79129C5.97925 6.12821 4.49976 7.8743 4.49976 9.92215V10.0921C4.49976 11.3079 5.00366 12.471 5.89429 13.3001Z"
        fill={color}
      />
    </Svg>
  );
}

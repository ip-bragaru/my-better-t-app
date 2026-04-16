import Svg, { Path, type SvgProps } from "react-native-svg";

import { DESIGN_TOKENS } from "@shared/config/design-tokens";

export function SendIcon(props: SvgProps) {
  return (
    <Svg width={20} height={19} viewBox="0 0 20 19" fill="none" {...props}>
      <Path
        d="M2.053 1.018C.778.465-.478 1.835.181 3.058l2.538 4.713a.75.75 0 0 0 .802.549l6.445.806a.254.254 0 0 1 .22.245.254.254 0 0 1-.22.245l-6.445.806a.75.75 0 0 0-.802.55L.181 15.691c-.66 1.223.597 2.593 1.872 2.04L18.236 10.72c1.175-.51 1.175-2.18 0-2.69L2.053 1.018Z"
        fill={props.color ?? DESIGN_TOKENS.color.brand.disabled}
      />
    </Svg>
  );
}

import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
  type SvgProps,
} from "react-native-svg";

type SadMascotIllustrationProps = Omit<SvgProps, "viewBox">;

export function SadMascotIllustration(props: SadMascotIllustrationProps) {
  return (
    <Svg width={216} height={176} viewBox="0 0 216 176" fill="none" {...props}>
      <Defs>
        <LinearGradient id="post-error-body" x1="92" y1="84" x2="168" y2="160" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#707A8C" />
          <Stop offset="1" stopColor="#4C5566" />
        </LinearGradient>
        <RadialGradient id="post-error-head" cx="0" cy="0" r="1" gradientTransform="matrix(0 54 -59 0 103 40)" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#D9D2FF" />
          <Stop offset="1" stopColor="#A99AF9" />
        </RadialGradient>
        <LinearGradient id="post-error-tail-pink" x1="128" y1="118" x2="196" y2="150" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FF2B75" />
          <Stop offset="1" stopColor="#FF5A96" />
        </LinearGradient>
        <LinearGradient id="post-error-tail-purple" x1="112" y1="112" x2="182" y2="146" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#5831E8" />
          <Stop offset="1" stopColor="#6D2EE8" />
        </LinearGradient>
      </Defs>

      <Ellipse cx="116" cy="155" rx="42" ry="11" fill="#3A3459" fillOpacity="0.12" />

      <Path
        d="M128 112C148 117 165 127 179 143"
        stroke="url(#post-error-tail-purple)"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <Path
        d="M135 116C157 122 176 133 193 150"
        stroke="url(#post-error-tail-pink)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <Path
        d="M123 118C145 128 159 139 172 151"
        stroke="#8F73FF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />

      <Path
        d="M109 85C123 80 144 82 157 93C171 106 173 129 162 145C151 160 129 165 111 157C93 149 83 129 87 110C89 99 97 89 109 85Z"
        fill="url(#post-error-body)"
      />
      <Circle cx="148" cy="108" r="6" fill="#C9D0DF" fillOpacity="0.18" />
      <Circle cx="139" cy="129" r="7" fill="#D8DDEA" fillOpacity="0.18" />
      <Circle cx="154" cy="136" r="8" fill="#E2E7F0" fillOpacity="0.14" />

      <Path
        d="M120 108C129 116 131 127 128 141"
        stroke="#2E3442"
        strokeWidth="4"
        strokeLinecap="round"
        strokeOpacity="0.35"
      />

      <Path
        d="M65 50C54 47 45 47 36 51"
        stroke="#FF2B75"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <Path
        d="M61 60C47 61 37 67 29 77"
        stroke="#FF2B75"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <Path
        d="M63 71C49 77 39 87 33 98"
        stroke="#FF2B75"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <Path
        d="M66 82C54 90 47 100 43 110"
        stroke="#FF2B75"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <Path
        d="M151 50C162 47 171 47 180 51"
        stroke="#FF2B75"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <Path
        d="M155 60C169 61 179 67 187 77"
        stroke="#FF2B75"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <Path
        d="M153 71C167 77 177 87 183 98"
        stroke="#FF2B75"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <Path
        d="M150 82C162 90 169 100 173 110"
        stroke="#FF2B75"
        strokeWidth="8"
        strokeLinecap="round"
      />

      <Path
        d="M65 50C55 49 47 50 39 54"
        stroke="#FF7BAC"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M61 60C49 63 41 68 34 76"
        stroke="#FF7BAC"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M63 71C51 78 43 87 38 96"
        stroke="#FF7BAC"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M151 50C161 49 169 50 177 54"
        stroke="#FF7BAC"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M155 60C167 63 175 68 182 76"
        stroke="#FF7BAC"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M153 71C165 78 173 87 178 96"
        stroke="#FF7BAC"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Ellipse cx="108" cy="56" rx="50" ry="42" fill="url(#post-error-head)" />
      <Ellipse cx="91" cy="36" rx="20" ry="14" fill="#F5F1FF" fillOpacity="0.72" />

      <Path
        d="M74 49C78 44 83 42 88 42"
        stroke="#657186"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <Path
        d="M127 42C132 42 137 44 141 49"
        stroke="#657186"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      <G>
        <Circle cx="76" cy="67" r="11" fill="#5A667A" />
        <Circle cx="73" cy="63" r="3.5" fill="#F8FBFF" />
        <Circle cx="79.5" cy="68.5" r="1.75" fill="#E4ECF5" />
      </G>
      <G>
        <Circle cx="126" cy="67" r="11" fill="#5A667A" />
        <Circle cx="123" cy="63" r="3.5" fill="#F8FBFF" />
        <Circle cx="129.5" cy="68.5" r="1.75" fill="#E4ECF5" />
      </G>

      <Circle cx="66" cy="79" r="7" fill="#FF4D87" />
      <Circle cx="136" cy="79" r="7" fill="#FF4D87" />

      <Path
        d="M95 92C99 88 103 88 107 92"
        stroke="#6B5AAE"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <Path
        d="M94 102C98 98 104 98 108 102"
        stroke="#6B5AAE"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      <Path
        d="M84 103L96 99L95 111C90 112 86 110 84 103Z"
        fill="#FF2B75"
      />
      <Path
        d="M118 99L130 103C128 110 124 112 119 111L118 99Z"
        fill="#FF2B75"
      />
      <Circle cx="107" cy="104" r="6.5" fill="#FF5B97" />

      <Path
        d="M93 111C88 122 86 134 87 149"
        stroke="#5831E8"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <Path
        d="M121 111C125 123 126 136 124 149"
        stroke="#8B78FF"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <Path
        d="M92 149C95 144 101 143 105 147C104 156 100 162 92 160C88 156 88 151 92 149Z"
        fill="#B6A9FF"
      />
      <Path
        d="M120 149C123 144 129 143 133 147C132 156 128 162 120 160C116 156 116 151 120 149Z"
        fill="#B6A9FF"
      />
      <Path
        d="M90 116C83 115 77 120 76 127"
        stroke="#FF2B75"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Path
        d="M124 117C131 116 137 121 139 129"
        stroke="#8B78FF"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Path
        d="M71 123C67 135 66 145 67 157"
        stroke="#5831E8"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Path
        d="M146 126C157 133 169 140 183 142"
        stroke="#FF2B75"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <Path
        d="M83 125C87 131 89 138 88 146"
        stroke="#DAD0FF"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M118 126C121 132 123 139 122 146"
        stroke="#EAE3FF"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Svg>
  );
}

import {
  DEFAULT_THEME,
  DESIGN_TOKENS,
  type DesignThemeName,
} from "./design-tokens.generated";

export { DEFAULT_THEME, DESIGN_TOKENS, type DesignThemeName };

export function resolveDesignTheme(): DesignThemeName {
  return DEFAULT_THEME;
}

export function getThemeClassName() {
  return `theme-${resolveDesignTheme()}`;
}

export function getDesignTokens(theme: DesignThemeName = DEFAULT_THEME) {
  return {
    foundation: DESIGN_TOKENS.foundation,
    component: DESIGN_TOKENS.component,
    semantic: DESIGN_TOKENS.semantic[theme],
  } as const;
}

export function useDesignTokens() {
  return getDesignTokens();
}

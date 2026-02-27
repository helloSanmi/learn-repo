function fromWindow() {
  return typeof window !== "undefined" ? window.__APP_CONFIG__ || {} : {};
}

function parseBool(value, fallback) {
  if (value == null) return fallback;
  return String(value).toLowerCase() === "true";
}

export function getAppConfig() {
  const w = fromWindow();
  const theme = w.themeDefault || import.meta.env.VITE_APP_THEME_DEFAULT || "corp";
  const themeDefault = ["corp", "school", "stem"].includes(theme) ? theme : "corp";
  return {
    appEnv: w.appEnv || import.meta.env.VITE_APP_ENV || "development",
    appTitle: w.appTitle || import.meta.env.VITE_APP_TITLE || "Star Dash",
    brandTagline:
      w.brandTagline || import.meta.env.VITE_APP_BRAND_TAGLINE || "Arcade challenge game",
    themeDefault,
    showEnvBadge: parseBool(w.showEnvBadge ?? import.meta.env.VITE_APP_SHOW_ENV_BADGE, true),
    enableThemeSwitcher: parseBool(
      w.enableThemeSwitcher ?? import.meta.env.VITE_APP_ENABLE_THEME_SWITCHER,
      true,
    ),
  };
}

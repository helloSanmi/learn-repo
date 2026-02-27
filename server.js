import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const PORT = Number(process.env.PORT || 8080);
const DIST_DIR = path.join(__dirname, "dist");

app.get("/app-config.js", (_, res) => {
  const appEnv = process.env.APP_ENV || "production";
  const appTitle = process.env.APP_TITLE || "Star Dash";
  const brandTagline = process.env.APP_BRAND_TAGLINE || "Arcade challenge game";
  const themeDefault = process.env.APP_THEME_DEFAULT || "corp";
  const showEnvBadge = process.env.APP_SHOW_ENV_BADGE || "true";
  const enableThemeSwitcher = process.env.APP_ENABLE_THEME_SWITCHER || "true";
  const config = { appEnv, appTitle, brandTagline, themeDefault, showEnvBadge, enableThemeSwitcher };
  const js = `window.__APP_CONFIG__=${JSON.stringify(config)};`;
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.type("application/javascript").send(js);
});

app.use(express.static(DIST_DIR));

app.get("*", (_, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`APP_ENV=${process.env.APP_ENV || "production"}`);
  console.log(`APP_TITLE=${process.env.APP_TITLE || "Star Dash"}`);
  console.log(`Star Dash listening on port ${PORT}`);
});

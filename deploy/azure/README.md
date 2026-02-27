# Azure Web App

## Option A: Code Deploy (Node runtime)
1. Configure startup command: `npm start`
2. Set app setting `WEBSITE_NODE_DEFAULT_VERSION` to a Node 18+ version.
3. Keep `PORT` managed by Azure (injected automatically).

`postinstall` runs the Vite build, so `dist/` is ready before `npm start`.

## Windows App Service
If using Windows plans with IIS/node integration, keep `web.config` from this folder.

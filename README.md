# Taskline

A Vite + React task management web app with a sidebar workspace, task table, and analytics panel.

## Local Run

```bash
npm install
npm run dev
```

The dev server binds to `0.0.0.0` and uses:
- `VITE_PORT` if provided
- otherwise `3000`

## Production

```bash
npm run build
PORT=8080 npm start
```

`npm start` serves the built `dist/` app and binds to `process.env.PORT` with a default of `8080`.

## App Env Variables

- `APP_TITLE`: app title in server/runtime mode
- `VITE_APP_TITLE`: app title in local Vite mode
- `PORT`: server port for `npm start`

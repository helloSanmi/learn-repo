#!/usr/bin/env sh
set -eu

if [ ! -d "dist" ]; then
  npm run build
fi

exec node server.js

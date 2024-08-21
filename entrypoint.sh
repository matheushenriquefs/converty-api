#!/bin/sh

if [ "$NODE_ENV" = "development" ]; then
  if [ ! -d 'node_modules' ]; then
    npm install
  fi
  npm run dev
else
  node ./bin/server.js
fi

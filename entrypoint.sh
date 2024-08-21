#!/bin/sh

if [ "$NODE_ENV" = "development" ]; then
        npm run dev
else
  node ./bin/server.js
fi

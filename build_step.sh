#!/bin/bash

echo "Build script"

# add the commands here

npm install

cd client

npm install

npm run build

mv build/ ../
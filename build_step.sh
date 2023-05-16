#!/bin/bash

echo "Build script"
npm install
cd client
npm install
npm run build
cd ..
mkdir build
mv client/build/* build
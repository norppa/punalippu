#!/bin/sh
rm -rf build
cd front
npm run build
cp -r build ..
cd ..
git add .
git commit -m "heroku deployment"
git push heroku master

#!/bin/bash

set -e

rm -rf ./release
npm install
npm version minor
npm run package
npm run sign
electron-release --token=$TOKEN --app=release/darwin-x64/Pomo-darwin-x64/Pomo.app
git add auto_updater.json
git commit --amend --no-edit
git push
git push origin --tags

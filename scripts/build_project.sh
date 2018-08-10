#!/usr/bin/env bash

set -ex

COCOS_DMG="CocosCreator_v1.10.0_20180730.dmg"
COCOS_MNT="cocos_mount"

# attach and install cocos
curl -O http://digitalocean.cocos2d-x.org/CocosCreator/v1.10.0/$COCOS_DMG
hdiutil convert $COCOS_DMG -format UDTO -o cocos.cdr
hdiutil attach -noautoopen -mountpoint $COCOS_MNT cocos.cdr

# init the cocos setting
mkdir ~/.CocosCreator/
cp ./scripts/cocos_settings.json ~/.CocosCreator/settings.json

# build the damn files
$COCOS_MNT/CocosCreator.app/Contents/MacOS/CocosCreator --path . --build "platform=web-desktop" --configPath="./scripts/build_config.json"

# detach and remove
rm -rf $COCOS_DMG
hdiutil detach $COCOS_MNT
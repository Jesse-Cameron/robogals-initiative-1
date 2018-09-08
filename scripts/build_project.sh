#!/usr/bin/env bash

set -ex

COCOS_VERSION=v2.0.1
COCOS_DMG="CocosCreator_${COCOS_VERSION}_20180823.dmg"
COCOS_MNT="cocos_mount"

# attach and install cocos
curl -O http://digitalocean.cocos2d-x.org/CocosCreator/$COCOS_VERSION/$COCOS_DMG
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
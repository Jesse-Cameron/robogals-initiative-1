#!/usr/bin/env bash

set -ex

version=$(jq '.version' package.json)

# set ssh key
git config --local user.name "Travis Deploy"
git config --local user.email "travis@travis-ci.org"
git status


# add all the build files
ls
mkdir ../tmp
mv ./build/web-desktop/* ../tmp/
ls -al ..
ls -al ../tmp
# commit
git checkout -b gh-pages
rm -rf ./* # remove all of the files
mv ../tmp/* ./ # add in the build files
ls -al
pwd

git add .
git commit -m "deploy $version"
git remote add origin-pages https://${GH_TOKEN}@github.com/Jesse-Cameron/robogals-initiative-1.git
git push --quiet --set-upstream origin-pages gh-pages
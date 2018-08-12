#!/usr/bin/env bash

set -ex

version=$(jq '.version' package.json)

# set git account
git config --local user.name "Travis Deploy"
git config --local user.email "travis@travis-ci.org"

# add all the build files
mkdir ../tmp
mv ./build/web-desktop/* ../tmp/ # move files to a temp directory
git checkout -b gh-pages
rm -rf ./* # remove all of the files
mv ../tmp/* ./ # add in the build files

# commit
git add .
git commit -m "deploy $version"
git remote add origin-pages https://${GH_TOKEN}@github.com/Jesse-Cameron/robogals-initiative-1.git
git push --quiet --set-upstream --force origin-pages gh-pages
#!/usr/bin/env bash

# set ssh key


# add all the build files
ls
mkdir ../tmp
mv ./build/web-desktop/* ../tmp/
ls ../tmp
rm -rf ./*
mv ../tmp/* ./*
ls
pwd

# commit
#!/usr/bin/env sh

#
# A script to speed up testing
# Run by "./build_test"
#

#Compile TypeScript
tsc

#Compile jsdoc
jsdoc target/*.js -t docs/docdash -d docs

#run tests
node target/KaravaanTests.js

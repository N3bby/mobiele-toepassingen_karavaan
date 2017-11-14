#!/usr/bin/env sh

#
# A script to speed up testing
# Run by "./build_test"
#

#Compile TypeScript
tsc

#run tests
node target/KaravaanTests.js

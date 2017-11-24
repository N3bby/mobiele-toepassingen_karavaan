#!/usr/bin/env sh

#
# A script to speed up testing
# Run by "./build_test"
#

# Compile TypeScript
tsc

# Check if  the documentation theme exists.
if [ ! -d "target/docs/docdash" ]; then
git clone https://github.com/clenemt/docdash.git ./target/docs/docdash
fi 

# Compile jsdoc
jsdoc target/*.js -t ./target/docs/docdash -d ./target/docs

#run tests
node target/KaravaanTests.js

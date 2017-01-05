#!/bin/bash

library_name=$(node -p "require('./package.json').name")

cd example_tmp
npm install
react-native unlink $library_name
react-native link

#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  osx)
    $HOME/.nvm/nvm.sh
    nvm install 7.2.0
  ;;
  linux)
    $HOME/.nvm/nvm.sh
    nvm install 7.2.0
    android list targets
  ;;
esac

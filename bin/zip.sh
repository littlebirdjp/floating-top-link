#!/bin/bash

VERSION='1.0.3'

function build_floating-top-link() {
  mkdir floating-top-link
  cp -rpf css floating-top-link/
  cp -rpf fonts floating-top-link/
  cp -rpf js floating-top-link/
  cp -rpf languages floating-top-link/
  cp *.php floating-top-link/
  cp *.txt floating-top-link/
  cd release
  zip floating-top-link.$VERSION.zip -r ../floating-top-link -x "*.DS_Store"
  rm -rf ../floating-top-link
  return
}
if [[ -f floating-top-link.$VERSION.zip ]]
then
  rm -rf floating-top-link.$VERSION.zip
fi
build_floating-top-link

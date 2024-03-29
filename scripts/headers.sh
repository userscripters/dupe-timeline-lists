#!/bin/bash

dist="dist"
output=$dist"/headers.js"

generate-headers tampermonkey \
    -o $output \
    -m meta all "https://domain/posts/*/timeline*|revisions*" \
    --require "https://raw.githubusercontent.com/userscripters/storage/master/dist/browser.js" \
    --grant get set delete \
    --collapse \
    --pretty

userscript="$(find -iwholename "./$dist/*\.js" -type f -not -iname "*headers\.js")"

sed -i -e "{1e cat $output; echo; echo" -e "; N}" $userscript

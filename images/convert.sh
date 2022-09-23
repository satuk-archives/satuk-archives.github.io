#!/usr/bin/env bash
# convert each png to jpg (100% quality) and delete the png
for i in *.png; do
  echo "Converting $i to jpg"
    convert "$i" "${i%.png}.jpg"
    rm "$i"
done
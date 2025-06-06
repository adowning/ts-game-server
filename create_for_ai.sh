#!/bin/bash

# Delete existing directory
rm -rf /tmp/ai

# Create fresh directory
mkdir -p /tmp/ai
mkdir -p /tmp/ai/ai

# Copy project folders with exclusions
rsync -av \
  --exclude=node_modules/ \
  --exclude=prisma/ \
  --exclude=src/phpfiles/Games/ \
  --exclude=public/ \
  --exclude=server/.vscode/ \
  . /tmp/ai/ai/

# Create target schema directory
mkdir -p /tmp/ai/ai/prisma

# Copy and rename prisma files
for file in ./prisma/*.prisma; do
  if [ -f "$file" ]; then
    base=$(basename "$file" .prisma)
    echo $base
    cp "$file" "/tmp/ai/ai/prisma/${base}.txt"
  fi
done

# Copy and rename vue files
# find /tmp/ai/ai -type f -name "*.vue" | while read -r file; do
#   base=$(basename "$file" .vue)
#   dir=$(dirname "$file")
#   cp "$file" "${dir}/${base}.vue.txt"
#   rm "$file"
# done

mkdir -p /tmp/ai/ai/src/phpfiles/Games
cp -r "src/phpfiles/Games/CloverStonesNG" "/tmp/ai/ai/src/phpfiles/Games/CloverStonesNG"
cp -r "src/phpfiles/Games/AfricanKingNG" "/tmp/ai/ai/src/phpfiles/Games/AfricanKingNG"
cd /tmp/ai/ai &&
npx repomix .  --compress --remove-comments --remove-empty-lines --verbose

echo "Directory sync completed successfully"
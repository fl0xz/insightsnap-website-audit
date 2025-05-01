#!/bin/bash
echo "Starting build process..."
npx next build
mkdir -p public
if [ -f ".next/routes-manifest.json" ]; then
  cp .next/routes-manifest.json public/routes-manifest.json
fi
echo "Build completed"
exit 0

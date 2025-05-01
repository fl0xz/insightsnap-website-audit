#!/bin/bash

# This script is used for Vercel deployment with proper Next.js build

echo "Starting Next.js build process..."

# Run Next.js build
npx next build

echo "Next.js build completed successfully!"
exit 0 
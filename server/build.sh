#!/bin/bash

# TradeScalpSnip Build Script
echo "🚀 Building TradeScalpSnip..."

# Install server dependencies
echo "📦 Installing server dependencies..."
npm install

# Build client (frontend)
echo "🎨 Building frontend..."
cd ..
npm install
npm run build
cd server

# Build server (TypeScript)
echo "⚙️ Building server..."
npm run build:server

echo "✅ Build complete!"

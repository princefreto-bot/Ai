#!/bin/bash
set -e

# TradeScalpSnip Build Script
echo "🚀 Building TradeScalpSnip..."

# Get the current directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "📂 Script directory: $SCRIPT_DIR"

# Install server dependencies
echo "📦 Installing server dependencies..."
npm install

# Build client (frontend)
echo "🎨 Building frontend..."
cd "$SCRIPT_DIR/.."
echo "📂 Now in: $(pwd)"
npm install
npm run build

# Check if dist was created
if [ -d "dist" ]; then
    echo "✅ Frontend dist folder created successfully"
    ls -la dist/
else
    echo "❌ ERROR: dist folder not created!"
    exit 1
fi

cd "$SCRIPT_DIR"
echo "📂 Back in: $(pwd)"

# Build server (TypeScript)
echo "⚙️ Building server..."
npm run build:server

# Check if server dist was created
if [ -d "dist" ]; then
    echo "✅ Server dist folder created successfully"
    ls -la dist/
else
    echo "❌ ERROR: Server dist folder not created!"
    exit 1
fi

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║  ✅ BUILD COMPLETE!                                    ║"
echo "║  Frontend: ../dist/                                    ║"
echo "║  Server: ./dist/                                       ║"
echo "╚════════════════════════════════════════════════════════╝"

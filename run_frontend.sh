#!/bin/bash

# TTS AI Video Generator - Frontend Startup Script

echo "🎬 Starting TTS AI Video Generator Frontend..."

# Check if we're in the right directory
if [ ! -f "frontend/package.json" ]; then
    echo "❌ Error: frontend/package.json not found. Make sure you're in the project root directory."
    exit 1
fi

# Change to frontend directory
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Start the development server
echo "🚀 Starting Vite development server..."
echo "🌐 Frontend will be available at: http://localhost:3000"
echo "🔄 Hot reload is enabled - changes will be reflected automatically"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
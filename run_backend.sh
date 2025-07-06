#!/bin/bash

# TTS AI Video Generator - Backend Startup Script

echo "🚀 Starting TTS AI Video Generator Backend..."

# Check if we're in the right directory
if [ ! -f "requirements.txt" ]; then
    echo "❌ Error: requirements.txt not found. Make sure you're in the project root directory."
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install/upgrade dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found. Creating from template..."
    cp .env.example .env 2>/dev/null || echo "# Add your ELEVENLABS_API_KEY here" > .env
    echo "📝 Please edit .env file and add your API keys"
fi

# Change to backend directory
cd backend

# Start the server
echo "🎬 Starting FastAPI server..."
echo "📡 Backend will be available at: http://localhost:8000"
echo "📖 API docs will be available at: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

uvicorn server:app --reload --host 0.0.0.0 --port 8000
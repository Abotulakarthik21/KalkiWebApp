#!/bin/bash

# KaliWebApp Initialization Script
# This script sets up the development environment

echo "🚀 KaliWebApp Development Environment Setup"
echo "==========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node -v)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "Backend dependencies already installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your configuration:"
    echo "   - NEO4J credentials"
    echo "   - JWT_SECRET"
    echo "   - SMTP settings (Gmail)"
fi

echo "✅ Backend setup complete"
echo ""

# Go back to root
cd ..

# Setup Frontend
echo "📦 Setting up Frontend..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "Frontend dependencies already installed"
fi

# Check if .env.development.local exists
if [ ! -f ".env.development.local" ]; then
    echo "Creating .env.development.local..."
    echo "VITE_API_URL=http://localhost:5000/api" > .env.development.local
fi

echo "✅ Frontend setup complete"
echo ""

# Setup information
echo "==========================================="
echo "✨ Setup Complete!"
echo "==========================================="
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Configure Backend Environment:"
echo "   nano backend/.env"
echo "   (Update: NEO4J_URI, NEO4J_PASSWORD, JWT_SECRET, SMTP settings)"
echo ""
echo "2. Start Neo4j Database:"
echo "   Option A: Using Neo4j Desktop (Recommended)"
echo "   Option B: Using Docker:"
echo "      docker-compose up -d neo4j"
echo ""
echo "3. Start Backend:"
echo "   cd backend && npm run dev"
echo ""
echo "4. Start Frontend (in another terminal):"
echo "   npm run dev"
echo ""
echo "5. Open in Browser:"
echo "   http://localhost:5173"
echo ""
echo "📚 Documentation:"
echo "   - SETUP_GUIDE.md - Complete setup instructions"
echo "   - API_DOCUMENTATION.md - API endpoints reference"
echo "   - QUICK_COMMANDS.md - Useful commands"
echo ""
echo "💡 Tips:"
echo "   - Check backend/.env.example for all available settings"
echo "   - Gmail users: Generate App Password at myaccount.google.com/apppasswords"
echo "   - Use Neo4j Browser at http://localhost:7474 to view database"
echo ""

@echo off
REM KaliWebApp Initialization Script for Windows
REM This script sets up the development environment

echo.
echo ============================================
echo KaliWebApp Development Environment Setup
echo ============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo OK - Node.js found: 
node -v
echo.

REM Setup Backend
echo Setting up Backend...
cd backend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed
)

REM Check if .env exists
if not exist ".env" (
    echo Creating .env file from template...
    copy .env.example .env
    echo WARNING: Please edit backend\.env with your configuration:
    echo   - NEO4J credentials
    echo   - JWT_SECRET
    echo   - SMTP settings (Gmail)
)

echo OK - Backend setup complete
echo.

REM Go back to root
cd ..

REM Setup Frontend
echo Setting up Frontend...

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed
)

REM Check if .env.development.local exists
if not exist ".env.development.local" (
    echo Creating .env.development.local...
    (
        echo VITE_API_URL=http://localhost:5000/api
    ) > .env.development.local
)

echo OK - Frontend setup complete
echo.

REM Setup information
echo ============================================
echo Setup Complete!
echo ============================================
echo.
echo Next Steps:
echo.
echo 1. Configure Backend Environment:
echo    Edit backend\.env manually
echo    (Update: NEO4J_URI, NEO4J_PASSWORD, JWT_SECRET, SMTP settings)
echo.
echo 2. Start Neo4j Database:
echo    Option A: Using Neo4j Desktop (Recommended)
echo    Option B: Using Docker:
echo       docker-compose up -d neo4j
echo.
echo 3. Start Backend:
echo    cd backend && npm run dev
echo.
echo 4. Start Frontend (in another terminal):
echo    npm run dev
echo.
echo 5. Open in Browser:
echo    http://localhost:5173
echo.
echo Documentation:
echo   - SETUP_GUIDE.md - Complete setup instructions
echo   - API_DOCUMENTATION.md - API endpoints reference
echo   - QUICK_COMMANDS.md - Useful commands
echo.
echo Tips:
echo   - Check backend\.env.example for all available settings
echo   - Gmail users: Generate App Password at myaccount.google.com/apppasswords
echo   - Use Neo4j Browser at http://localhost:7474 to view database
echo.
pause

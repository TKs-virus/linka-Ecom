#!/bin/bash

echo "🔍 Diagnosing Linka Application Issues..."
echo "========================================"

# Check if required files exist
echo "📁 Checking project structure..."
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found"
    exit 1
fi

if [ ! -f "next.config.mjs" ]; then
    echo "❌ next.config.mjs not found"
    exit 1
fi

echo "✅ Project structure looks good"

# Check environment variables
echo ""
echo "🔧 Checking environment variables..."
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found"
    echo "📝 Creating sample .env.local file..."
    cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database URLs (if using direct Postgres connection)
POSTGRES_URL=your_postgres_url_here
POSTGRES_PRISMA_URL=your_postgres_prisma_url_here
POSTGRES_URL_NON_POOLING=your_postgres_non_pooling_url_here
POSTGRES_USER=your_postgres_user_here
POSTGRES_PASSWORD=your_postgres_password_here
POSTGRES_DATABASE=your_postgres_database_here
POSTGRES_HOST=your_postgres_host_here
EOF
    echo "📝 Please update .env.local with your actual values"
else
    echo "✅ .env.local file exists"
    
    # Check if required variables are set
    if grep -q "your_supabase_url_here" .env.local; then
        echo "⚠️  Please update NEXT_PUBLIC_SUPABASE_URL in .env.local"
    fi
    
    if grep -q "your_supabase_anon_key_here" .env.local; then
        echo "⚠️  Please update NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    fi
fi

# Check Node.js and npm versions
echo ""
echo "🔧 Checking Node.js environment..."
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

if command -v pnpm &> /dev/null; then
    echo "pnpm version: $(pnpm --version)"
fi

# Check if dependencies are installed
echo ""
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "❌ node_modules not found"
    echo "📦 Installing dependencies..."
    if command -v pnpm &> /dev/null; then
        pnpm install
    else
        npm install
    fi
else
    echo "✅ Dependencies installed"
fi

# Check if ports are available
echo ""
echo "🌐 Checking port availability..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 3000 is already in use"
    echo "Process using port 3000:"
    lsof -Pi :3000 -sTCP:LISTEN
else
    echo "✅ Port 3000 is available"
fi

# Try to build the application
echo ""
echo "🏗️  Testing application build..."
if command -v pnpm &> /dev/null; then
    pnpm build
else
    npm run build
fi

if [ $? -eq 0 ]; then
    echo "✅ Application builds successfully"
else
    echo "❌ Application build failed"
    echo "Check the error messages above for details"
fi

echo ""
echo "🚀 Diagnosis complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your actual Supabase credentials"
echo "2. Run 'npm run dev' or 'pnpm dev' to start the development server"
echo "3. Visit http://localhost:3000/debug to check database connectivity"
echo "4. If issues persist, check the browser console for errors"

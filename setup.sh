#!/bin/bash

echo "🎮 TypeScript Game Server Setup"
echo "================================"

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed. Please install Bun first:"
    echo "   curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

echo "✅ Bun found: $(bun --version)"

# Install dependencies
echo "📦 Installing dependencies..."
bun install

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env .env.example 2>/dev/null || echo "⚠️  Please create .env file manually"
else
    echo "✅ .env file exists"
fi

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
bun run db:generate

echo ""
echo "🚀 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure your .env file with database credentials"
echo "2. Run 'bun run db:push' to create database schema"
echo "3. Run 'bun run db:seed' to seed with NG games"
echo "4. Run 'bun run dev' to start the development server"
echo ""
echo "The server will be available at: http://localhost:3000"
echo "WebSocket endpoints:"
echo "  - ws://localhost:3000/slots (main game connection)"
echo "  - ws://localhost:3000/live (live updates)"

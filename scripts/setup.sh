#!/bin/bash

# AI Learning OS - Development Setup Script

set -e

echo "🚀 Setting up AI Learning OS Development Environment..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
check_prerequisite() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}Error: $1 is not installed${NC}"
        exit 1
    fi
}

echo -e "${YELLOW}Checking prerequisites...${NC}"
check_prerequisite "node"
check_prerequisite "npm"
check_prerequisite "python3"
check_prerequisite "docker"

# Get version info
NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
PYTHON_VERSION=$(python3 --version)
DOCKER_VERSION=$(docker --version)

echo -e "${GREEN}✓ Node.js: $NODE_VERSION${NC}"
echo -e "${GREEN}✓ npm: $NPM_VERSION${NC}"
echo -e "${GREEN}✓ Python: $PYTHON_VERSION${NC}"
echo -e "${GREEN}✓ Docker: $DOCKER_VERSION${NC}"

# Setup Backend
echo -e "\n${YELLOW}Setting up Backend...${NC}"
cd backend
npm install
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

# Setup Frontend
echo -e "\n${YELLOW}Setting up Frontend...${NC}"
cd ../frontend
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

# Setup AI Services
echo -e "\n${YELLOW}Setting up AI Services...${NC}"
cd ../ai-services
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate
echo -e "${GREEN}✓ AI Services dependencies installed${NC}"

# Create environment files
echo -e "\n${YELLOW}Creating environment files...${NC}"

# Backend .env
if [ ! -f "../backend/.env" ]; then
    cp ../config/.env.example ../backend/.env
    echo -e "${GREEN}✓ Created backend/.env${NC}"
fi

# Frontend .env.local
if [ ! -f "../frontend/.env.local" ]; then
    cat > ../frontend/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WS_URL=ws://localhost:5000
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000
EOF
    echo -e "${GREEN}✓ Created frontend/.env.local${NC}"
fi

# AI Services .env
if [ ! -f "../ai-services/.env" ]; then
    cp ../ai-services/.env.example ../ai-services/.env
    echo -e "${GREEN}✓ Created ai-services/.env${NC}"
fi

echo -e "\n${GREEN}🎉 Setup complete!${NC}"
echo ""
echo "To start development:"
echo "  1. Start Docker services:  docker-compose up -d"
echo "  2. Start Backend:          cd backend && npm run dev"
echo "  3. Start Frontend:          cd frontend && npm run dev"
echo "  4. Start AI Services:      cd ai-services && ./start.sh"
echo ""
echo "Or use: docker-compose up -d"


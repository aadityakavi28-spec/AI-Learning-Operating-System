# AI Learning Operating System - Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ 
- **Python** 3.11+
- **PostgreSQL** 15+
- **Redis** 7+
- **Docker** & Docker Compose (optional)
- **Git**

## Quick Start with Docker

The easiest way to get started:

```bash
# Clone the repository
git clone https://github.com/your-username/ai-learning-os.git
cd ai-learning-os

# Copy environment variables
cp config/.env.example .env

# Start all services
docker-compose up -d
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- AI Services: http://localhost:8000

## Manual Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-learning-os.git
cd ai-learning-os
```

### 2. Database Setup

#### Option A: Local PostgreSQL

```bash
# Create database
createdb ai_learning_os

# Run migrations
psql -d ai_learning_os -f database/schema.sql
```

#### Option B: Docker PostgreSQL

```bash
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=ai_learning_os \
  -p 5432:5432 \
  postgres:15-alpine
```

### 3. Redis Setup

```bash
# Local Redis
docker run -d --name redis -p 6379:6379 redis:7-alpine
```

### 4. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp ../config/.env.example .env

# Update .env with your settings
# Especially: DATABASE_URL and JWT_SECRET

# Run migrations (if using Prisma)
npx prisma migrate dev

# Start the server
npm run dev
```

### 5. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp ../config/.env.example .env.local

# Start development server
npm run dev
```

### 6. AI Services Setup

```bash
cd ai-services

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Update .env with your API keys
# Required: OPENAI_API_KEY or ANTHROPIC_API_KEY

# Start the server
uvicorn main:app --reload
```

## Environment Variables

### Backend (.env)

```env
PORT=5000
DATABASE_URL=postgresql://user:pass@localhost:5432/ai_learning_os
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
AI_SERVICE_URL=http://localhost:8000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000
```

### AI Services (.env)

```env
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
YOUTUBE_API_KEY=your-youtube-key
```

## Verify Installation

1. **Frontend**: Visit http://localhost:3000
2. **Backend**: http://localhost:5000/health
3. **AI Services**: http://localhost:8000/health

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :3000  # Frontend
lsof -i :5000  # Backend
lsof -i :8000  # AI Services

# Kill the process
kill -9 <PID>
```

### Database Connection Issues

1. Check PostgreSQL is running
2. Verify DATABASE_URL in .env
3. Ensure database exists

### Redis Connection Issues

1. Check Redis is running
2. Verify REDIS_URL in .env

## Next Steps

- Read the [API Documentation](api/README.md)
- Check out the [Project Structure](structure.md)
- Learn about [Contributing](CONTRIBUTING.md)


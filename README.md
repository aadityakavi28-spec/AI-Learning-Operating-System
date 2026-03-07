# AI Learning Operating System

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/Next.js-14-black.svg" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.2-blue.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/Python-FastAPI-orange.svg" alt="FastAPI">
</p>

> An AI-powered learning platform that transforms how students learn from internet resources by tracking behavior, optimizing study processes, and providing personalized guidance.

---

## 🚀 Elevator Pitch

AI Learning OS is an intelligent operating system for education that combines adaptive learning technology, AI-powered assistants, and behavioral analytics to create personalized learning experiences from YouTube videos, articles, and online tutorials.

---

## 📚 Problem Statement

The internet has democratized access to knowledge. Students today have unlimited access to:

- **YouTube tutorials** with millions of educational videos
- **Online articles** from thousands of sources
- **Interactive courses** from platforms like Coursera, Udemy, and edX
- **Open-source documentation** and wikis

However, despite this abundance, **students are struggling to learn effectively**. The problem isn't a lack of resources—it's the absence of an intelligent layer that helps students:

1. Find the right resources for their level
2. Track their learning progress
3. Retain information effectively
4. Identify and fix learning gaps

---

## ❌ Why Current Online Learning Fails

| Issue | Description |
|-------|-------------|
| **Information Overload** | Students spend more time searching for resources than actually learning |
| **Passive Consumption** | Watching videos without engagement leads to poor retention |
| **No Spaced Repetition** | Most platforms don't implement scientifically-proven retention techniques |
| **No Progress Visibility** | Students can't see their actual learning progress or mastery levels |
| **One-Size-Fits-All** | Content is static, ignoring individual learning patterns and gaps |
| **Disconnected Tools** | Notes, flashcards, and videos exist in separate silos |
| **No AI Assistance** | Students learn alone without intelligent guidance |

Traditional learning management systems (LMS) were designed for static courses, not for the dynamic, self-directed learning that modern education requires.

---

## 💡 Solution Overview

**AI Learning OS** is an intelligent learning operating system that sits between students and their learning resources. It acts as a personalized AI tutor that:

```
┌─────────────────────────────────────────────────────────────────┐
│                     AI Learning OS                              │
├─────────────────────────────────────────────────────────────────┤
│  🤖 AI Search     →  Find the best resources for you           │
│  📖 Learning Env  →  Immersive video/article consumption        │
│  📝 Smart Notes   →  Auto-generated notes from content         │
│  🧠 Flashcards    →  Spaced repetition for long-term retention  │
│  📊 Analytics     →  Deep insights into learning behavior      │
│  🩺 AI Doctor     →  Diagnose and fix learning issues          │
│  📅 Study Plans   →  AI-generated personalized plans           │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Core Features

### 1. Intelligent Learning Search Engine
- Semantic search across YouTube, articles, tutorials, and courses
- AI-powered recommendations based on learning history
- Difficulty filtering and content curation

### 2. Immersive Learning Environment
- Integrated video player with timestamp annotations
- Article reader with highlighting and note-taking
- Split-view for multi-resource learning

### 3. AI Learning Assistant
- Real-time Q&A while consuming content
- Concept explanations at different difficulty levels
- Context-aware responses based on current learning material

### 4. Smart Notes System
- Rich text notes with markdown support
- Auto-linking related concepts
- Tags and folder organization

### 5. Flashcard System with Spaced Repetition
- Automatic flashcard generation from content
- SM-2 algorithm implementation for optimal review scheduling
- Deck management and progress tracking

### 6. Learning Behavior Analytics
- Study time tracking and patterns
- Concept mastery visualization
- Progress charts and streak tracking

### 7. AI Learning Doctor
- Automated diagnosis of learning issues
- Identification of knowledge gaps
- Personalized recommendations for improvement

### 8. Personalized Study Plan Generator
- AI-generated study plans based on goals and timeline
- Adaptive scheduling based on performance
- Daily task recommendations

---

## 🏗️ System Architecture

```
                           ┌─────────────────────────────────────┐
                           │         Client Applications         │
                           │    (Web, Mobile - Coming Soon)      │
                           └──────────────┬──────────────────────┘
                                          │
                                          ▼
                           ┌─────────────────────────────────────┐
                           │         Nginx API Gateway           │
                           │      (Load Balancing, SSL)          │
                           └──────────────┬──────────────────────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    │                     │                     │
                    ▼                     ▼                     ▼
        ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
        │   Frontend        │ │   Backend API     │ │  AI Services     │
        │   (Next.js 14)    │ │   (Node.js)       │ │  (FastAPI)       │
        │   React 18        │ │   Express         │ │  Python 3.11     │
        │   TypeScript      │ │   TypeScript      │ │  OpenAI/LangChain│
        └─────────┬─────────┘ └─────────┬─────────┘ └─────────┬─────────┘
                  │                     │                     │
                  └─────────────────────┼─────────────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
                    ▼                   ▼                   ▼
          ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
          │   PostgreSQL   │ │     Redis      │ │   External     │
          │   Database     │ │     Cache      │ │     APIs       │
          │   (Primary)    │ │   (Sessions)   │ │ (YouTube, etc) │
          └────────────────┘ └────────────────┘ └────────────────┘
```

### Microservices Architecture

| Service | Technology | Responsibility |
|---------|------------|----------------|
| **Frontend** | Next.js 14, React 18 | User interface, SSR, routing |
| **Backend API** | Node.js, Express | REST API, auth, business logic |
| **AI Services** | Python, FastAPI | AI processing, LLM integration |

---

## 🏛️ Platform Layers Explanation

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │Dashboard│ │ Learn   │ │ Notes   │ │Analytics│ │ Profile │   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                    APPLICATION LAYER                           │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │  Auth Service│ │  User Service│ │Resource Service│          │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │Note Service  │ │Flashcard    │ │Analytics     │            │
│  │              │ │Service       │ │Service        │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
├─────────────────────────────────────────────────────────────────┤
│                      AI LAYER                                   │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │Search Engine │ │AI Assistant  │ │Study Plan    │            │
│  │              │ │              │ │Generator      │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│  ┌──────────────┐ ┌──────────────┐                              │
│  │Flashcard     │ │Learning      │                              │
│  │Generator     │ │Doctor         │                              │
│  └──────────────┘ └──────────────┘                              │
├─────────────────────────────────────────────────────────────────┤
│                      DATA LAYER                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │PostgreSQL    │ │Redis         │ │Vector DB     │            │
│  │(Persistent)  │ │(Caching)     │ │(Semantic)     │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Example User Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                        Jane's Learning Journey                   │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1️⃣ SEARCH                                                     │
│     "Learn React hooks" → AI recommends best YouTube videos    │
│     and articles based on her level                             │
│                                                                  │
│          ▼                                                       │
│                                                                  │
│  2️⃣ LEARN                                                       │
│     Watches video in immersive player                           │
│     • Timestamped notes                                         │
│     • Highlights important sections                            │
│     • AI assistant explains concepts on-demand                  │
│                                                                  │
│          ▼                                                       │
│                                                                  │
│  3️⃣ GENERATE                                                    │
│     AI auto-generates flashcards from video content            │
│     Creates smart notes with key concepts                       │
│                                                                  │
│          ▼                                                       │
│                                                                  │
│  4️⃣ REVIEW                                                      │
│     Spaced repetition schedules daily flashcard reviews        │
│     Tracks mastery level per concept                            │
│                                                                  │
│          ▼                                                       │
│                                                                  │
│  5️⃣ ANALYZE                                                     │
│     Dashboard shows progress, streaks, time spent             │
│     AI Doctor identifies gaps and suggests focus areas         │
│                                                                  │
│          ▼                                                       │
│                                                                  │
│  6️⃣ PLAN                                                        │
│     AI generates personalized study plan for mastery           │
│     Adapts based on performance data                            │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.x | UI library |
| **Next.js** | 14.x | Framework, SSR, routing |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 3.x | Styling |
| **Zustand** | 4.x | State management |
| **React Query** | 5.x | Server state |
| **Recharts** | 2.x | Data visualization |
| **Framer Motion** | 10.x | Animations |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 20.x | Runtime |
| **Express** | 4.x | Web framework |
| **TypeScript** | 5.x | Type safety |
| **PostgreSQL** | 15.x | Primary database |
| **Redis** | 7.x | Caching & sessions |
| **Socket.IO** | 4.x | Real-time communication |

### AI Services
| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.11 | AI runtime |
| **FastAPI** | 0.104.x | API framework |
| **OpenAI** | 1.3.x | LLM (GPT-4) |
| **Anthropic** | 0.7.x | LLM (Claude) |
| **LangChain** | 0.1.x | AI orchestration |
| **ChromaDB** | 0.4.x | Vector database |

### DevOps
| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Orchestration |
| **Nginx** | Reverse proxy |
| **Winston** | Logging |

---

## 🔮 Future Vision

### Short-term (v1.1 - v1.3)
- [ ] Mobile apps (iOS/Android)
- [ ] Collaborative learning rooms
- [ ] Quiz generation from content
- [ ] PDF document support
- [ ] Browser extension

### Medium-term (v2.0)
- [ ] AI-powered tutor with voice
- [ ] Peer matching for study partners
- [ ] Certification system
- [ ] Integration with LMS (Canvas, Blackboard)
- [ ] Team/workspace features

### Long-term (v3.0)
- [ ] Learning OS for enterprises
- [ ] Multi-language support
- [ ] AR/VR learning modules
- [ ] Blockchain credentials
- [ ] Research partnerships

---

## 📁 Folder Structure

```
ai-learning-os/
├── frontend/                     # Next.js 14 React application
│   ├── src/
│   │   ├── app/                 # App router pages
│   │   │   ├── dashboard/       # Dashboard page
│   │   │   ├── learn/          # Learning environment
│   │   │   ├── notes/          # Notes management
│   │   │   ├── analytics/      # Analytics dashboard
│   │   │   ├── login/          # Authentication
│   │   │   └── signup/         # Registration
│   │   ├── components/         # React components
│   │   │   ├── ai/             # AI chat & assistant
│   │   │   ├── analytics/      # Charts & metrics
│   │   │   ├── dashboard/      # Dashboard widgets
│   │   │   ├── layout/         # Nav, sidebar, etc.
│   │   │   ├── learning/        # Video player, resources
│   │   │   └── notes/          # Notes & flashcards
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utilities & API client
│   │   ├── store/              # Zustand stores
│   │   └── types/              # TypeScript types
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/                     # Node.js Express API
│   ├── src/
│   │   ├── config/             # Database, Redis, env
│   │   ├── controllers/        # Route handlers
│   │   ├── middleware/         # Auth, error handling
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Utilities
│   │   └── server.ts           # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── ai-services/                 # Python FastAPI AI microservice
│   ├── app/
│   │   ├── config.py           # Configuration
│   │   ├── routes/             # API endpoints
│   │   │   ├── analysis.py     # Learning analysis
│   │   │   ├── assistant.py    # AI chat assistant
│   │   │   ├── flashcards.py   # Flashcard generation
│   │   │   ├── search.py       # Resource search
│   │   │   └── study_plan.py   # Plan generation
│   │   ├── services/           # AI services
│   │   └── utils/              # Utilities
│   ├── main.py                 # Entry point
│   └── requirements.txt
│
├── database/                    # PostgreSQL schema & migrations
│   └── schema.sql              # Database schema
│
├── config/                      # Shared configuration
│   └── .env.example            # Environment template
│
├── deployment/                  # Docker & deployment configs
│   ├── docker-compose.yml      # Full stack compose
│   └── nginx.conf              # Nginx configuration
│
├── docs/                        # Documentation
│   ├── installation.md         # Setup guide
│   └── structure.md            # Architecture docs
│
├── scripts/                     # Utility scripts
│   └── setup.sh               # Setup automation
│
└── README.md                    # This file
```

---

## 🚦 Installation Guide

### Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| **Node.js** | 18+ | LTS recommended |
| **Python** | 3.11+ | Required for AI services |
| **PostgreSQL** | 15+ | Primary database |
| **Redis** | 7+ | Cache & sessions |
| **Docker** | Latest | Optional but recommended |
| **Git** | Latest | Version control |

### Quick Start with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/your-username/ai-learning-os.git
cd ai-learning-os

# Copy environment template
cp config/.env.example .env

# Edit .env with your API keys
# Required: OPENAI_API_KEY or ANTHROPIC_API_KEY

# Start all services
docker-compose up -d

# Access the application
# Frontend:  http://localhost:3000
# Backend:   http://localhost:5000
# AI API:    http://localhost:8000
```

### Manual Setup

#### 1. Database Setup

```bash
# Create database
createdb ai_learning_os

# Run schema
psql -d ai_learning_os -f database/schema.sql
```

#### 2. Backend Setup

```bash
cd backend
npm install
cp ../config/.env.example .env
# Configure .env with your settings
npm run dev
```

#### 3. Frontend Setup

```bash
cd frontend
npm install
cp ../config/.env.example .env.local
npm run dev
```

#### 4. AI Services Setup

```bash
cd ai-services
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Add your OPENAI_API_KEY
uvicorn main:app --reload
```

### Verify Installation

| Service | URL | Expected Response |
|---------|-----|-------------------|
| Frontend | http://localhost:3000 | Next.js landing page |
| Backend | http://localhost:5000/health | `{"status": "healthy"}` |
| AI Services | http://localhost:8000/health | `{"status": "healthy"}` |

---

## 🗺️ Development Roadmap

### Phase 1: Foundation (v1.0) - ✅ Complete
- [x] Core platform architecture
- [x] User authentication system
- [x] Basic learning environment
- [x] Notes and flashcards
- [x] Analytics dashboard

### Phase 2: AI Integration (v1.1) - In Progress
- [x] AI search engine
- [x] AI learning assistant
- [ ] Flashcard auto-generation
- [ ] Smart notes enhancement

### Phase 3: Intelligence (v1.2)
- [ ] Learning Doctor diagnosis
- [ ] Personalized study plans
- [ ] Concept mastery tracking
- [ ] Adaptive learning paths

### Phase 4: Scale (v1.3)
- [ ] Mobile applications
- [ ] Browser extension
- [ ] Offline support
- [ ] Performance optimization

---

## 🤝 Contributing

We welcome contributions from developers, educators, and AI researchers!

### Getting Started

```bash
# Fork the repository
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ai-learning-os.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes
# Write tests (if applicable)

# Commit with descriptive messages
git commit -m "Add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Open a Pull Request
```

### Code Style

- **Frontend**: ESLint + Prettier (see `frontend/.eslintrc`)
- **Backend**: ESLint + TypeScript conventions
- **AI Services**: Black + isort for Python

### Commit Messages

We follow [Conventional Commits](https://conventionalcommits.org):

```
feat: add new feature
fix: resolve bug
docs: update documentation
refactor: code restructuring
test: add tests
chore: maintenance tasks
```

### Code of Conduct

Please read our [Code of Conduct](docs/CODE_OF_CONDUCT.md) before contributing.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 AI Learning OS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

### AI Learning OS Team

<div align="center">
  <img src="https://img.shields.io/badge/Maintainer-Lead%20Developer-blue" alt="Lead Developer">
  <img src="https://img.shields.io/badge/Contact-hello%40ailearningos.ai-red" alt="Email">
</div>

---

<p align="center">
  <strong>Built with ❤️ for the future of education</strong>
</p>

<p align="center">
  <a href="https://github.com/ai-learning-os">
    <img src="https://img.shields.io/github/stars/ai-learning-os?style=social" alt="GitHub Stars">
  </a>
  <a href="https://github.com/ai-learning-os">
    <img src="https://img.shields.io/github/forks/ai-learning-os?style=social" alt="GitHub Forks">
  </a>
  <a href="https://twitter.com/ailearningos">
    <img src="https://img.shields.io/twitter/follow/ailearningos?style=social" alt="Twitter">
  </a>
</p>

---

*Last updated: 2024 | Version 1.0.0*


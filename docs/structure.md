# AI Learning Operating System - Project Structure

```
ai-learning-os/
├── README.md                      # Project overview and documentation
├── LICENSE                        # MIT License
├── .gitignore                     # Git ignore patterns
│
├── frontend/                      # Next.js + React frontend application
│   ├── package.json               # Frontend dependencies
│   ├── tsconfig.json              # TypeScript configuration
│   ├── next.config.js             # Next.js configuration
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   ├── postcss.config.js          # PostCSS configuration
│   ├── jest.config.js              # Jest testing configuration
│   ├── Dockerfile                  # Frontend Docker image
│   ├── .env.example               # Environment variables template
│   │
│   ├── public/                    # Static assets
│   │   ├── favicon.ico
│   │   ├── og-image.png
│   │   └── images/
│   │
│   └── src/
│       ├── app/                   # Next.js App Router
│       │   ├── globals.css        # Global styles
│       │   ├── layout.tsx         # Root layout
│       │   ├── page.tsx           # Home page
│       │   ├── providers.tsx      # React providers
│       │   ├── loading.tsx        # Loading state
│       │   ├── error.tsx         # Error boundary
│       │   │
│       │   ├── (auth)/           # Auth routes group
│       │   │   ├── login/
│       │   │   └── register/
│       │   │
│       │   ├── dashboard/        # User dashboard
│       │   ├── search/            # Search page
│       │   ├── resources/        # Resource viewer
│       │   ├── notes/             # Notes management
│       │   ├── flashcards/       # Flashcards
│       │   ├── study-plan/        # Study plans
│       │   ├── analytics/         # Progress analytics
│       │   └── settings/          # User settings
│       │
│       ├── components/           # React components
│       │   ├── ui/               # Base UI components
│       │   │   ├── Button.tsx
│       │   │   ├── Input.tsx
│       │   │   ├── Card.tsx
│       │   │   ├── Modal.tsx
│       │   │   └── ...
│       │   │
│       │   ├── layout/            # Layout components
│       │   │   ├── Header.tsx
│       │   │   ├── Sidebar.tsx
│       │   │   ├── Footer.tsx
│       │   │   └── ...
│       │   │
│       │   ├── auth/             # Auth components
│       │   ├── search/           # Search components
│       │   ├── notes/            # Notes components
│       │   ├── flashcards/       # Flashcard components
│       │   ├── video/            # Video player components
│       │   ├── analytics/        # Charts and graphs
│       │   └── ai/               # AI assistant UI
│       │
│       ├── hooks/                # Custom React hooks
│       │   ├── useAuth.ts
│       │   ├── useSearch.ts
│       │   ├── useNotes.ts
│       │   ├── useFlashcards.ts
│       │   └── ...
│       │
│       ├── lib/                  # Utility libraries
│       │   ├── api.ts            # API client
│       │   ├── auth.ts          # Auth utilities
│       │   ├── utils.ts         # General utilities
│       │   └── constants.ts     # App constants
│       │
│       ├── store/                # State management (Zustand)
│       │   ├── useAuthStore.ts
│       │   ├── useNoteStore.ts
│       │   ├── useUIStore.ts
│       │   └── ...
│       │
│       ├── types/                # TypeScript types
│       │   ├── index.ts
│       │   ├── user.ts
│       │   ├── note.ts
│       │   ├── flashcard.ts
│       │   └── ...
│       │
│       └── styles/               # Additional styles
│
├── backend/                      # Node.js + Express backend API
│   ├── package.json               # Backend dependencies
│   ├── tsconfig.json              # TypeScript configuration
│   ├── jest.config.js             # Jest testing config
│   ├── Dockerfile                 # Backend Docker image
│   ├── .env.example              # Environment variables
│   │
│   └── src/
│       ├── server.ts             # Express app entry point
│       ├── app.ts                # Express app configuration
│       │
│       ├── config/               # Configuration
│       │   ├── env.ts           # Environment config
│       │   ├── database.ts      # Database connection
│       │   └── redis.ts         # Redis connection
│       │
│       ├── controllers/          # Route controllers
│       │   ├── auth.controller.ts
│       │   ├── user.controller.ts
│       │   ├── resource.controller.ts
│       │   ├── note.controller.ts
│       │   ├── flashcard.controller.ts
│       │   ├── analytics.controller.ts
│       │   └── studyPlan.controller.ts
│       │
│       ├── routes/               # API routes
│       │   ├── auth.routes.ts
│       │   ├── user.routes.ts
│       │   ├── resource.routes.ts
│       │   ├── note.routes.ts
│       │   ├── flashcard.routes.ts
│       │   ├── analytics.routes.ts
│       │   ├── studyPlan.routes.ts
│       │   └── ai.routes.ts
│       │
│       ├── services/             # Business logic
│       │   ├── user.service.ts
│       │   ├── auth.service.ts
│       │   ├── resource.service.ts
│       │   ├── note.service.ts
│       │   ├── flashcard.service.ts
│       │   └── analytics.service.ts
│       │
│       ├── models/               # Data models (Prisma/TypeORM)
│       │   ├── user.model.ts
│       │   ├── note.model.ts
│       │   └── ...
│       │
│       ├── middleware/           # Express middleware
│       │   ├── auth.ts          # JWT authentication
│       │   ├── errorHandler.ts  # Error handling
│       │   ├── rateLimiter.ts   # Rate limiting
│       │   ├── validator.ts      # Request validation
│       │   └── cors.ts           # CORS configuration
│       │
│       ├── utils/                # Utility functions
│       │   ├── logger.ts         # Winston logger
│       │   ├── jwt.ts           # JWT helpers
│       │   ├── email.ts          # Email helpers
│       │   └── helpers.ts
│       │
│       └── types/                # TypeScript types
│
├── ai-services/                  # Python FastAPI AI microservices
│   ├── requirements.txt          # Python dependencies
│   ├── Dockerfile                # AI services Docker image
│   ├── .env.example             # Environment variables
│   │
│   ├── main.py                  # FastAPI app entry point
│   │
│   └── app/
│       ├── config.py             # Configuration
│       │
│       ├── routes/               # API endpoints
│       │   ├── search.py         # Learning resource search
│       │   ├── assistant.py      # AI assistant chat
│       │   ├── flashcards.py     # Flashcard generation
│       │   ├── study_plan.py     # Study plan generation
│       │   └── analysis.py       # Learning analysis
│       │
│       ├── services/             # AI services
│       │   ├── search_service.py
│       │   ├── assistant_service.py
│       │   ├── flashcard_service.py
│       │   ├── study_plan_service.py
│       │   └── analysis_service.py
│       │
│       ├── utils/                # Utilities
│       │   ├── logger.py
│       │   └── validators.py
│       │
│       └── models/               # Pydantic models
│
├── database/                     # Database configuration
│   ├── schema.sql               # PostgreSQL schema
│   ├── migrations/              # Database migrations
│   ├── seeds/                   # Seed data
│   └── backup/                  # Backup scripts
│
├── config/                       # Shared configuration
│   ├── .env.example            # Environment template
│   └── tsconfig.json
│
├── scripts/                      # Utility scripts
│   ├── setup.sh                 # Development setup
│   ├── deploy.sh                # Deployment script
│   ├── backup.sh                # Database backup
│   └── migrate.sh               # Migration runner
│
├── docs/                         # Documentation
│   ├── installation.md          # Installation guide
│   ├── api/                     # API documentation
│   │   └── README.md
│   ├── structure.md             # This file
│   ├── contributing.md          # Contributing guide
│   └── deployment.md            # Deployment guide
│
├── tests/                        # Test suites
│   ├── frontend/                # Frontend tests
│   │   ├── __tests__/
│   │   └── e2e/
│   │
│   ├── backend/                 # Backend tests
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   │
│   └── ai-services/             # AI service tests
│
└── deployment/                   # Deployment configs
    ├── docker-compose.yml       # Docker Compose for dev
    ├── docker-compose.prod.yml  # Production compose
    ├── nginx.conf               # Nginx reverse proxy
    ├── ssl/                     # SSL certificates
    ├── kubernetes/              # K8s manifests
    └── .github/                 # GitHub Actions
        └── workflows/
```

## Key Technologies

### Frontend
- **React 18** - UI library
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS
- **TypeScript** - Type safety
- **Zustand** - Lightweight state management
- **React Query** - Server state management
- **Recharts** - Data visualization
- **React Player** - Video playback

### Backend
- **Node.js 20** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Primary database
- **Redis** - Caching and sessions
- **JWT** - Authentication
- **Prisma** - ORM

### AI Services
- **Python 3.11** - AI runtime
- **FastAPI** - Python web framework
- **LangChain** - LLM orchestration
- **OpenAI** - GPT models
- **Anthropic** - Claude models

### Infrastructure
- **Docker** - Containerization
- **Nginx** - Reverse proxy
- **PostgreSQL** - Database
- **Redis** - Cache


// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  role: 'student' | 'teacher' | 'admin';
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

// Resource Types
export interface Resource {
  id: string;
  type: 'video' | 'article' | 'tutorial' | 'course';
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  source: string;
  duration?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ResourceSearchParams {
  query: string;
  type?: Resource['type'];
  difficulty?: Resource['difficulty'];
  tags?: string[];
  page?: number;
  limit?: number;
}

// Notes Types
export interface Note {
  id: string;
  title: string;
  content: string;
  userId: string;
  folderId?: string;
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Folder {
  id: string;
  name: string;
  userId: string;
  parentId?: string;
  color?: string;
  createdAt: string;
}

// Flashcard Types
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  userId: string;
  deckId?: string;
  nextReviewDate?: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  createdAt: string;
  updatedAt: string;
}

export interface Deck {
  id: string;
  name: string;
  description?: string;
  userId: string;
  cardCount: number;
  createdAt: string;
}

// Learning Analytics Types
export interface LearningStats {
  totalStudyTime: number;
  totalResourcesCompleted: number;
  totalNotes: number;
  totalFlashcards: number;
  averageDailyStudyTime: number;
  currentStreak: number;
  longestStreak: number;
  weeklyProgress: WeeklyProgress[];
  subjectBreakdown: SubjectProgress[];
}

export interface WeeklyProgress {
  day: string;
  studyTime: number;
  resourcesCompleted: number;
}

export interface SubjectProgress {
  subject: string;
  progress: number;
  timeSpent: number;
  resourcesCount: number;
}

// Study Plan Types
export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'paused';
  tasks: StudyTask[];
  createdAt: string;
  updatedAt: string;
}

export interface StudyTask {
  id: string;
  title: string;
  description?: string;
  resourceId?: string;
  duration: number;
  completed: boolean;
  dueDate?: string;
  order: number;
}

// AI Assistant Types
export interface AIConversation {
  id: string;
  userId: string;
  messages: AIMessage[];
  createdAt: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Behavior Tracking Types
export interface LearningSession {
  id: string;
  userId: string;
  resourceId?: string;
  startTime: string;
  endTime?: string;
  duration: number;
  actions: SessionAction[];
}

export interface SessionAction {
  type: 'play' | 'pause' | 'seek' | 'scroll' | 'click' | 'note' | 'flashcard';
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Dashboard Types
export interface DashboardData {
  user: User;
  stats: LearningStats;
  recentActivity: RecentActivity[];
  upcomingTasks: StudyTask[];
  recommendations: Resource[];
}

export interface RecentActivity {
  id: string;
  type: 'resource' | 'note' | 'flashcard' | 'study_plan';
  action: string;
  title: string;
  timestamp: string;
}


// Mock Data for AI Learning OS

// User Data
export const currentUser = {
  id: '1',
  name: 'Alex Thompson',
  email: 'alex.thompson@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  bio: 'Passionate learner exploring AI and Web Development',
  role: 'student' as const,
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-12-10T15:30:00Z',
};

// Topics
export const topics = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    description: 'Learn the core concepts of machine learning including supervised and unsupervised learning.',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
    progress: 75,
    totalResources: 12,
    completedResources: 9,
    difficulty: 'intermediate' as const,
    category: 'AI & Data Science',
    estimatedTime: '8 hours',
    lastStudied: '2024-12-09T14:30:00Z',
  },
  {
    id: '2',
    title: 'React Advanced Patterns',
    description: 'Master advanced React patterns including hooks, context, and performance optimization.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    progress: 45,
    totalResources: 15,
    completedResources: 7,
    difficulty: 'advanced' as const,
    category: 'Web Development',
    estimatedTime: '12 hours',
    lastStudied: '2024-12-08T09:15:00Z',
  },
  {
    id: '3',
    title: 'TypeScript Mastery',
    description: 'From basics to advanced TypeScript concepts for building type-safe applications.',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop',
    progress: 100,
    totalResources: 8,
    completedResources: 8,
    difficulty: 'beginner' as const,
    category: 'Programming',
    estimatedTime: '6 hours',
    lastStudied: '2024-12-05T16:45:00Z',
  },
  {
    id: '4',
    title: 'UI/UX Design Principles',
    description: 'Learn design thinking and create beautiful, user-friendly interfaces.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    progress: 20,
    totalResources: 10,
    completedResources: 2,
    difficulty: 'beginner' as const,
    category: 'Design',
    estimatedTime: '5 hours',
    lastStudied: '2024-12-07T11:20:00Z',
  },
  {
    id: '5',
    title: 'Data Structures & Algorithms',
    description: 'Essential computer science fundamentals for technical interviews.',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop',
    progress: 60,
    totalResources: 20,
    completedResources: 12,
    difficulty: 'intermediate' as const,
    category: 'Computer Science',
    estimatedTime: '20 hours',
    lastStudied: '2024-12-09T08:00:00Z',
  },
  {
    id: '6',
    title: 'Python for Data Science',
    description: 'Master Python libraries for data analysis and visualization.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
    progress: 30,
    totalResources: 14,
    completedResources: 4,
    difficulty: 'intermediate' as const,
    category: 'AI & Data Science',
    estimatedTime: '15 hours',
    lastStudied: '2024-12-06T13:45:00Z',
  },
];

// Learning Sessions
export const learningSessions = [
  {
    id: '1',
    topicId: '1',
    topicTitle: 'Machine Learning Fundamentals',
    startTime: '2024-12-10T09:00:00Z',
    endTime: '2024-12-10T10:30:00Z',
    duration: 90,
    resourceTitle: 'Introduction to Neural Networks',
    type: 'video' as const,
  },
  {
    id: '2',
    topicId: '2',
    topicTitle: 'React Advanced Patterns',
    startTime: '2024-12-09T14:00:00Z',
    endTime: '2024-12-09T15:00:00Z',
    duration: 60,
    resourceTitle: 'Custom Hooks Deep Dive',
    type: 'video' as const,
  },
  {
    id: '3',
    topicId: '5',
    topicTitle: 'Data Structures & Algorithms',
    startTime: '2024-12-09T08:00:00Z',
    endTime: '2024-12-09T09:30:00Z',
    duration: 90,
    resourceTitle: 'Binary Trees Explained',
    type: 'article' as const,
  },
  {
    id: '4',
    topicId: '1',
    topicTitle: 'Machine Learning Fundamentals',
    startTime: '2024-12-08T16:00:00Z',
    endTime: '2024-12-08T17:00:00Z',
    duration: 60,
    resourceTitle: 'Linear Regression Tutorial',
    type: 'video' as const,
  },
  {
    id: '5',
    topicId: '3',
    topicTitle: 'TypeScript Mastery',
    startTime: '2024-12-07T10:00:00Z',
    endTime: '2024-12-07T12:00:00Z',
    duration: 120,
    resourceTitle: 'Generics in TypeScript',
    type: 'tutorial' as const,
  },
];

// Notes
export const notes = [
  {
    id: '1',
    title: 'Neural Network Basics',
    content: `# Neural Networks Overview

A neural network is inspired by biological neurons in the brain.

## Key Components:
- **Input Layer**: Receives data
- **Hidden Layers**: Process information
- **Output Layer**: Produces results

## Activation Functions:
- ReLU (Rectified Linear Unit)
- Sigmoid
- Tanh

## Backpropagation
The process of training neural networks by adjusting weights based on error.`,
    topicId: '1',
    topicTitle: 'Machine Learning Fundamentals',
    tags: ['neural-networks', 'deep-learning', 'ai'],
    isPinned: true,
    createdAt: '2024-12-08T10:00:00Z',
    updatedAt: '2024-12-09T14:30:00Z',
  },
  {
    id: '2',
    title: 'React Hooks Best Practices',
    content: `# React Hooks Notes

## useState
- Use for simple state management
- Keep state as simple as possible

## useEffect
- Handle side effects
- Don't forget cleanup functions

## useMemo & useCallback
- Performance optimization
- Don't over-optimize!

## Custom Hooks
- Extract reusable logic
- Name starts with "use"`,
    topicId: '2',
    topicTitle: 'React Advanced Patterns',
    tags: ['react', 'hooks', 'frontend'],
    isPinned: false,
    createdAt: '2024-12-07T09:00:00Z',
    updatedAt: '2024-12-08T11:20:00Z',
  },
  {
    id: '3',
    title: 'TypeScript Utility Types',
    content: `# TypeScript Utility Types

## Partial<T>
Makes all properties optional

## Required<T>
Makes all properties required

## Pick<T, K>
Select specific properties

## Omit<T, K>
Exclude specific properties

## Record<K, T>
Construct object type

## Extract<T, U>
Extract types that are assignable`,
    topicId: '3',
    topicTitle: 'TypeScript Mastery',
    tags: ['typescript', 'types', 'programming'],
    isPinned: true,
    createdAt: '2024-12-05T15:00:00Z',
    updatedAt: '2024-12-06T09:45:00Z',
  },
  {
    id: '4',
    title: 'Big O Notation',
    content: `# Big O Notation

## Time Complexities:
- **O(1)**: Constant
- **O(log n)**: Logarithmic
- **O(n)**: Linear
- **O(n log n)**: Linearithmic
- **O(n²)**: Quadratic

## Space Complexity:
- How much memory an algorithm uses`,
    topicId: '5',
    topicTitle: 'Data Structures & Algorithms',
    tags: ['algorithms', 'complexity', 'interview'],
    isPinned: false,
    createdAt: '2024-12-04T12:00:00Z',
    updatedAt: '2024-12-07T08:30:00Z',
  },
];

// Flashcards
export const flashcards = [
  {
    id: '1',
    front: 'What is a Neural Network?',
    back: 'A computing system inspired by biological neural networks, consisting of interconnected nodes (neurons) that process information using connectionist approaches.',
    topicId: '1',
    topicTitle: 'Machine Learning Fundamentals',
    deckName: 'ML Basics',
    nextReviewDate: '2024-12-12T00:00:00Z',
    easeFactor: 2.5,
    interval: 3,
    repetitions: 5,
    createdAt: '2024-12-01T10:00:00Z',
  },
  {
    id: '2',
    front: 'What is Backpropagation?',
    back: 'A training algorithm for neural networks that calculates gradients of the loss function with respect to network weights, using chain rule to propagate error backwards.',
    topicId: '1',
    topicTitle: 'Machine Learning Fundamentals',
    deckName: 'ML Basics',
    nextReviewDate: '2024-12-11T00:00:00Z',
    easeFactor: 2.3,
    interval: 2,
    repetitions: 3,
    createdAt: '2024-12-02T10:00:00Z',
  },
  {
    id: '3',
    front: 'What is useState in React?',
    back: 'A built-in Hook that lets you add state to functional components. Returns an array with current state value and a function to update it.',
    topicId: '2',
    topicTitle: 'React Advanced Patterns',
    deckName: 'React Essentials',
    nextReviewDate: '2024-12-13T00:00:00Z',
    easeFactor: 2.8,
    interval: 5,
    repetitions: 8,
    createdAt: '2024-12-01T10:00:00Z',
  },
  {
    id: '4',
    front: 'What is the Virtual DOM?',
    back: 'A lightweight copy of the actual DOM that React uses to optimize rendering. Changes are made to the Virtual DOM first, then React efficiently updates only the changed elements in the real DOM.',
    topicId: '2',
    topicTitle: 'React Advanced Patterns',
    deckName: 'React Essentials',
    nextReviewDate: '2024-12-14T00:00:00Z',
    easeFactor: 2.6,
    interval: 4,
    repetitions: 6,
    createdAt: '2024-12-03T10:00:00Z',
  },
  {
    id: '5',
    front: 'What is O(n) time complexity?',
    back: 'Linear time complexity where execution time grows directly in proportion to input size. Example: iterating through an array.',
    topicId: '5',
    topicTitle: 'Data Structures & Algorithms',
    deckName: 'DSA Fundamentals',
    nextReviewDate: '2024-12-10T00:00:00Z',
    easeFactor: 2.5,
    interval: 3,
    repetitions: 4,
    createdAt: '2024-12-04T10:00:00Z',
  },
  {
    id: '6',
    front: 'What is a Hash Table?',
    back: 'A data structure that implements an associative array, mapping keys to values. Uses a hash function to compute an index into an array of buckets or slots.',
    topicId: '5',
    topicTitle: 'Data Structures & Algorithms',
    deckName: 'DSA Fundamentals',
    nextReviewDate: '2024-12-15T00:00:00Z',
    easeFactor: 2.4,
    interval: 2,
    repetitions: 3,
    createdAt: '2024-12-05T10:00:00Z',
  },
];

// Analytics Data
export const analyticsData = {
  weeklyStudyTime: [
    { day: 'Mon', minutes: 90, date: '2024-12-09' },
    { day: 'Tue', minutes: 120, date: '2024-12-10' },
    { day: 'Wed', minutes: 60, date: '2024-12-11' },
    { day: 'Thu', minutes: 75, date: '2024-12-12' },
    { day: 'Fri', minutes: 45, date: '2024-12-13' },
    { day: 'Sat', minutes: 30, date: '2024-12-14' },
    { day: 'Sun', minutes: 0, date: '2024-12-15' },
  ],
  conceptMastery: [
    { topic: 'Machine Learning', mastery: 75, color: '#0ea5e9' },
    { topic: 'React', mastery: 65, color: '#22d3ee' },
    { topic: 'TypeScript', mastery: 90, color: '#a855f7' },
    { topic: 'DSA', mastery: 55, color: '#f59e0b' },
    { topic: 'UI/UX', mastery: 30, color: '#ef4444' },
  ],
  monthlyProgress: [
    { month: 'Jul', studyTime: 1200, resources: 15 },
    { month: 'Aug', studyTime: 1800, resources: 22 },
    { month: 'Sep', studyTime: 1500, resources: 18 },
    { month: 'Oct', studyTime: 2100, resources: 28 },
    { month: 'Nov', studyTime: 2400, resources: 32 },
    { month: 'Dec', studyTime: 1800, resources: 20 },
  ],
  studyStreak: {
    current: 12,
    longest: 21,
    totalDays: 156,
    lastStudyDate: '2024-12-10T09:00:00Z',
  },
  totalStats: {
    totalStudyTime: 15620, // minutes
    totalResources: 135,
    totalNotes: 24,
    totalFlashcards: 48,
    averageDailyStudyTime: 45,
  },
  focusSessions: [
    { date: '2024-12-09', sessions: 4, focusScore: 85 },
    { date: '2024-12-10', sessions: 5, focusScore: 92 },
    { date: '2024-12-11', sessions: 3, focusScore: 78 },
    { date: '2024-12-12', sessions: 4, focusScore: 88 },
    { date: '2024-12-13', sessions: 2, focusScore: 70 },
    { date: '2024-12-14', sessions: 1, focusScore: 60 },
    { date: '2024-12-15', sessions: 0, focusScore: 0 },
  ],
};

// AI Chat Messages
export const aiChatMessages = [
  {
    id: '1',
    role: 'assistant',
    content: "Hi! I'm your AI learning assistant. I can help you understand concepts, create flashcards from your notes, suggest study strategies, and answer questions about your learning materials. How can I help you today?",
    timestamp: '2024-12-10T09:00:00Z',
  },
  {
    id: '2',
    role: 'user',
    content: 'Can you explain what gradient descent is?',
    timestamp: '2024-12-10T09:01:30Z',
  },
  {
    id: '3',
    role: 'assistant',
    content: "Of course! Gradient Descent is an optimization algorithm used to minimize a function by iteratively moving in the direction of steepest descent.\n\n**Key Points:**\n- It calculates the gradient (slope) of the loss function\n- Moves in the opposite direction of the gradient\n- Learning rate controls step size\n- Used in training neural networks\n\nThink of it like hiking down a mountain to the lowest point - you take steps in the direction that goes down most steeply!",
    timestamp: '2024-12-10T09:02:15Z',
  },
];

// Resources for Learning Page
export const learningResources = [
  {
    id: '1',
    type: 'video' as const,
    title: 'Introduction to Neural Networks',
    description: 'A comprehensive guide to understanding neural networks from scratch.',
    url: 'https://www.youtube.com/watch?v=aircAruvnKk',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    source: 'YouTube',
    duration: 45,
    difficulty: 'intermediate' as const,
    tags: ['neural-networks', 'deep-learning'],
  },
  {
    id: '2',
    type: 'article' as const,
    title: 'Understanding Backpropagation',
    description: 'Deep dive into the backpropagation algorithm with mathematical explanations.',
    url: 'https://medium.com/@14mrk',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop',
    source: 'Medium',
    duration: 20,
    difficulty: 'advanced' as const,
    tags: ['backpropagation', 'machine-learning'],
  },
  {
    id: '3',
    type: 'tutorial' as const,
    title: 'Building Your First ML Model',
    description: 'Step-by-step tutorial to build a machine learning model using Python.',
    url: 'https://www.kaggle.com',
    thumbnail: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&h=450&fit=crop',
    source: 'Kaggle',
    duration: 60,
    difficulty: 'beginner' as const,
    tags: ['python', 'machine-learning', 'tutorial'],
  },
];

// Recent Activity
export const recentActivity = [
  {
    id: '1',
    type: 'resource' as const,
    action: 'Completed',
    title: 'Introduction to Neural Networks',
    timestamp: '2024-12-10T10:30:00Z',
  },
  {
    id: '2',
    type: 'note' as const,
    action: 'Created',
    title: 'Neural Network Basics',
    timestamp: '2024-12-09T14:30:00Z',
  },
  {
    id: '3',
    type: 'flashcard' as const,
    action: 'Reviewed',
    title: '5 flashcards on ML Basics',
    timestamp: '2024-12-09T10:00:00Z',
  },
  {
    id: '4',
    type: 'study_plan' as const,
    action: 'Updated',
    title: 'Machine Learning Roadmap',
    timestamp: '2024-12-08T16:45:00Z',
  },
  {
    id: '5',
    type: 'resource' as const,
    action: 'Started',
    title: 'Linear Regression Tutorial',
    timestamp: '2024-12-08T14:00:00Z',
  },
];

// Study Plans
export const studyPlans = [
  {
    id: '1',
    title: 'Machine Learning Mastery',
    description: 'Complete ML fundamentals in 30 days',
    startDate: '2024-11-15T00:00:00Z',
    endDate: '2024-12-15T00:00:00Z',
    status: 'active' as const,
    progress: 65,
    totalTasks: 20,
    completedTasks: 13,
  },
  {
    id: '2',
    title: 'React Professional',
    description: 'Master React in 45 days',
    startDate: '2024-10-01T00:00:00Z',
    endDate: '2024-11-15T00:00:00Z',
    status: 'completed' as const,
    progress: 100,
    totalTasks: 25,
    completedTasks: 25,
  },
];

// Streak Data
export const streakData = {
  current: 12,
  longest: 21,
  weeklyGoal: 5,
  thisWeek: 4,
  lastStudyDate: '2024-12-10T09:00:00Z',
  studyDates: [
    '2024-12-01', '2024-12-02', '2024-12-03', '2024-12-04',
    '2024-12-05', '2024-12-06', '2024-12-07', '2024-12-08',
    '2024-12-09', '2024-12-10',
  ],
};


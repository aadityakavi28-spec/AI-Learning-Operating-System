import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { getSession, signOut } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const session = await getSession();
        
        if (session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`;
        }

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          await signOut({ callbackUrl: '/login' });
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.client.post('/api/auth/login', { email, password });
    return response.data;
  }

  async register(data: { email: string; password: string; name: string }) {
    const response = await this.client.post('/api/auth/register', data);
    return response.data;
  }

  async logout() {
    const response = await this.client.post('/api/auth/logout');
    return response.data;
  }

  // User endpoints
  async getProfile() {
    const response = await this.client.get('/api/users/profile');
    return response.data;
  }

  async updateProfile(data: Partial<{ name: string; avatar: string; bio: string }>) {
    const response = await this.client.put('/api/users/profile', data);
    return response.data;
  }

  // Learning resources endpoints
  async searchResources(query: string, filters?: { type?: string; difficulty?: string }) {
    const response = await this.client.get('/api/resources/search', {
      params: { q: query, ...filters },
    });
    return response.data;
  }

  async getResourceById(id: string) {
    const response = await this.client.get(`/api/resources/${id}`);
    return response.data;
  }

  async saveResource(resourceId: string) {
    const response = await this.client.post('/api/resources/save', { resourceId });
    return response.data;
  }

  // Notes endpoints
  async getNotes(params?: { page?: number; limit?: number; folderId?: string }) {
    const response = await this.client.get('/api/notes', { params });
    return response.data;
  }

  async createNote(data: { title: string; content: string; folderId?: string }) {
    const response = await this.client.post('/api/notes', data);
    return response.data;
  }

  async updateNote(id: string, data: { title?: string; content?: string }) {
    const response = await this.client.put(`/api/notes/${id}`, data);
    return response.data;
  }

  async deleteNote(id: string) {
    const response = await this.client.delete(`/api/notes/${id}`);
    return response.data;
  }

  // Flashcards endpoints
  async getFlashcards(params?: { deckId?: string; page?: number }) {
    const response = await this.client.get('/api/flashcards', { params });
    return response.data;
  }

  async createFlashcard(data: { front: string; back: string; deckId?: string }) {
    const response = await this.client.post('/api/flashcards', data);
    return response.data;
  }

  async reviewFlashcard(id: string, quality: number) {
    const response = await this.client.post(`/api/flashcards/${id}/review`, { quality });
    return response.data;
  }

  // Analytics endpoints
  async getLearningStats(period?: string) {
    const response = await this.client.get('/api/analytics/learning-stats', {
      params: { period },
    });
    return response.data;
  }

  async getProgressData() {
    const response = await this.client.get('/api/analytics/progress');
    return response.data;
  }

  async getStudyStreak() {
    const response = await this.client.get('/api/analytics/streak');
    return response.data;
  }

  // Study plan endpoints
  async getStudyPlan() {
    const response = await this.client.get('/api/study-plan');
    return response.data;
  }

  async generateStudyPlan(data: { topic: string; duration: number; goal: string }) {
    const response = await this.client.post('/api/study-plan/generate', data);
    return response.data;
  }

  async updateStudyPlanProgress(planId: string, taskId: string, completed: boolean) {
    const response = await this.client.put(`/api/study-plan/${planId}/task/${taskId}`, {
      completed,
    });
    return response.data;
  }

  // AI Assistant endpoints
  async askAIAssistant(message: string, context?: { resourceId?: string; noteId?: string }) {
    const response = await this.client.post('/api/ai/assistant', { message, context });
    return response.data;
  }

  // Health check
  async healthCheck() {
    const response = await this.client.get('/health');
    return response.data;
  }
}

export const apiClient = new ApiClient();
export default apiClient;


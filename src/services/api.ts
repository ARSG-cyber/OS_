import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for auth token
    this.axiosInstance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.patch(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
    return response.data;
  }
}

export const apiService = new ApiService();

// Domain-specific services
export const dashboardService = {
  getMetrics: async () => apiService.get('/dashboard/metrics'),
  getKPIs: async () => apiService.get('/dashboard/kpis'),
  getTimeline: async (limit = 20) => apiService.get(`/dashboard/timeline?limit=${limit}`),
  getSystemHealth: async () => apiService.get('/dashboard/health'),
};

export const aiService = {
  getAgents: async () => apiService.get('/ai/agents'),
  createAgent: async (data: unknown) => apiService.post('/ai/agents', data),
  getAgentLogs: async (agentId: string) => apiService.get(`/ai/agents/${agentId}/logs`),
  getPerformanceMetrics: async (agentId: string) => apiService.get(`/ai/agents/${agentId}/metrics`),
};

export const analyticsService = {
  getAnalytics: async () => apiService.get('/analytics'),
  getTrends: async (period = '30d') => apiService.get(`/analytics/trends?period=${period}`),
  getConversion: async () => apiService.get('/analytics/conversion'),
  getRevenue: async () => apiService.get('/analytics/revenue'),
  exportReport: async (format: 'pdf' | 'csv') => apiService.post(`/analytics/export?format=${format}`),
};

export const projectService = {
  getProjects: async () => apiService.get('/projects'),
  getProject: async (id: string) => apiService.get(`/projects/${id}`),
  createProject: async (data: unknown) => apiService.post('/projects', data),
  updateProject: async (id: string, data: unknown) => apiService.put(`/projects/${id}`, data),
  exportProject: async (id: string, format: 'json' | 'pdf' | 'markdown') => 
    apiService.post(`/projects/${id}/export?format=${format}`),
};

export const userService = {
  getProfile: async () => apiService.get('/user/profile'),
  updateProfile: async (data: unknown) => apiService.put('/user/profile', data),
  getSettings: async () => apiService.get('/user/settings'),
  updateSettings: async (data: unknown) => apiService.put('/user/settings', data),
};

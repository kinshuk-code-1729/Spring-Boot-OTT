import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const STREAMING_BASE_URL = import.meta.env.VITE_STREAMING_BASE_URL || 'http://localhost:8080';

// Create axios instances
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const streamingClient = axios.create({
  baseURL: STREAMING_BASE_URL,
  timeout: 30000,
  responseType: 'blob',
});

// Add request interceptor for auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Movie API calls
export const movieAPI = {
  // Get all movies
  getAllMovies: async () => {
    const response = await apiClient.get('/movie-info/list');
    return response.data;
  },

  // Get movie by ID
  getMovieById: async (id) => {
    const response = await apiClient.get(`/movie-info/find-path-by-id/${id}`);
    return response.data;
  },

  // Search movies (if backend supports it)
  searchMovies: async (query) => {
    const movies = await apiClient.get('/movie-info/list');
    const filtered = movies.data.filter(movie => 
      movie.name.toLowerCase().includes(query.toLowerCase()) ||
      movie.description.toLowerCase().includes(query.toLowerCase())
    );
    return filtered;
  },

  // Get streaming URL for movie
  getStreamUrl: (movieId) => {
    return `${STREAMING_BASE_URL}/stream/with-id/${movieId}`;
  },
};

// Auth API calls (placeholder - implement based on your backend auth)
export const authAPI = {
  login: async (credentials) => {
    // Mock implementation - replace with actual auth endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ token: 'mock-jwt-token', user: { id: 1, email: credentials.email } });
      }, 1000);
    });
  },

  register: async (userData) => {
    // Mock implementation - replace with actual registration endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ token: 'mock-jwt-token', user: { id: 1, email: userData.email } });
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};

// Watchlist API calls (placeholder)
export const watchlistAPI = {
  getWatchlist: async () => {
    // Mock implementation
    return [];
  },

  addToWatchlist: async (movieId) => {
    // Mock implementation
    return { success: true };
  },

  removeFromWatchlist: async (movieId) => {
    // Mock implementation
    return { success: true };
  },
};

export default apiClient;

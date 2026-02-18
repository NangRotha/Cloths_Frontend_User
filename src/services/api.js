import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Important for CORS
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Frontend-User API Request:', config.method?.toUpperCase(), config.url);
  return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('Frontend-User API Response:', response.config.method?.toUpperCase(), response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('Frontend-User API Error:', error.config?.method?.toUpperCase(), error.config?.url, error.response?.status);
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => {
    const params = new URLSearchParams();
    params.append('username', credentials.username);
    params.append('password', credentials.password);
    return api.post('/api/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  register: (userData) => api.post('/api/auth/register', userData),
  getProfile: () => api.get('/api/auth/me'),
  googleLogin: () => api.get('/api/auth/google'),
  loginWithGoogle: (token) => api.post('/api/auth/google/callback', { token }),
};

export const productsAPI = {
  getProducts: () => {
    console.log('Fetching products from backend...');
    return api.get('/api/products/');
  },
  getProduct: (id) => api.get(`/api/products/${id}/`),
};

export const ordersAPI = {
  createOrder: (orderData) => api.post('/api/orders/', orderData),
  getOrders: () => api.get('/api/orders/'),
  getOrder: (id) => api.get(`/api/orders/${id}/`),
  generateKHQR: (orderId) => api.post(`/api/orders/${orderId}/generate-khqr`),
  verifyPayment: (orderId, data) => api.post(`/api/orders/${orderId}/verify-payment`, data),
};

export default api;

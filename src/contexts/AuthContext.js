import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { getApiUrl } from '../utils/helpers';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user info
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      console.log('Fetching user profile...');
      const response = await authAPI.getProfile();
      console.log('User profile response:', response.data);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      console.log('Attempting login...');
      const response = await authAPI.login(credentials);
      console.log('Login response:', response.data);
      
      const { access_token, ...userData } = response.data;
      
      localStorage.setItem('token', access_token);
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'ការចូលប្រើប្រាស់បរាជ័យ';
      
      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail.map(err => err.msg).join(', ');
        } else {
          errorMessage = error.response.data.detail;
        }
      }
      
      return { success: false, error: errorMessage };
    }
  };
    const register = async (userData) => {
    try {
      console.log('Attempting registration...');
      const response = await authAPI.register(userData);
      console.log('Registration response:', response.data);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'ការចុះឈ្មោះបរាជ័យ។ សូមព្យាយាមម្តងទៀត។';
      
      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail.map(err => err.msg).join(', ');
        } else {
          errorMessage = error.response.data.detail;
        }
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const loginWithGoogle = async (token) => {
    try {
      localStorage.setItem('token', token);
      // Fetch user profile with the Google token
      const response = await authAPI.getProfile();
      setUser(response.data);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Google login error:', error);
      localStorage.removeItem('token');
      return { success: false, error: 'ការភ្ជាប់ជាមួយ Google បរាជ័យ' };
    }
  };

  const googleLogin = () => {
    // Check if Google OAuth is available by testing the endpoint first
    const apiUrl = getApiUrl();
    fetch(`${apiUrl}/api/auth/google`)
      .then(response => {
        if (!response.ok) {
          // If not configured, redirect to setup instructions
          window.location.href = `${apiUrl}/api/auth/google`;
          return;
        }
        // If the endpoint is working, redirect to Google OAuth
        window.location.href = `${apiUrl}/api/auth/google`;
      })
      .catch(error => {
        console.error('Google OAuth not available:', error);
        // Show helpful setup instructions
        alert(`🔧 Google OAuth Setup Required:

1. Go to: https://console.cloud.google.com/
2. Create project → Enable APIs (Google+ API, Google OAuth2 API)
3. Create OAuth 2.0 Client ID
4. Add redirect URI: http://localhost:8000/api/auth/google/callback
5. Copy Client ID and Client Secret
6. Edit: /Users/rotha/Documents/Project /Cloth/backend/.env
7. Replace lines 9-10 with your actual credentials

File location: /Users/rotha/Documents/Project /Cloth/backend/.env

After setup, Google login will work automatically!`);
      });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    googleLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

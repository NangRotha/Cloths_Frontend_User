import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const GoogleAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setError('ការផ្ទៀងផ្ទាត់ Google បរាជ័យ');
        setLoading(false);
        return;
      }

      try {
        // Store the token and fetch user info
        localStorage.setItem('token', token);
        const result = await loginWithGoogle(token);
        
        if (result.success) {
          navigate('/');
        } else {
          setError(result.error || 'ការផ្ទៀងផ្ទាត់ Google បរាជ័យ');
        }
      } catch (err) {
        setError('មានបញ្ហាក្នុងការភ្ជាប់ជាមួយ Google');
      } finally {
        setLoading(false);
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate, loginWithGoogle]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 khmer-text">កំពុងភ្ជាប់ជាមួយ Google...</h2>
          <p className="text-gray-600 mt-2 khmer-text">សូមរង់ចាំបន្តិច</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 khmer-text">មានបញ្ហា</h2>
          <p className="text-gray-600 mb-6 khmer-text">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors khmer-text"
          >
            ត្រឡប់ទៅកាន់ក្រុមព័ត៌មាន
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default GoogleAuthCallback;

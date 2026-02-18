import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';

const Profile = () => {
  const { user, logout, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    email: '',
    phone_number: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userStats, setUserStats] = useState({
    totalOrders: 0,
    totalSpent: 0
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        full_name: user.full_name || '',
        email: user.email || '',
        phone_number: user.phone_number || ''
      });
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      // In a real app, you'd have an endpoint for user stats
      // For now, we'll use the orders endpoint
      const response = await authAPI.getProfile();
      if (response.data) {
        setUserStats({
          totalOrders: response.data.total_orders || 0,
          totalSpent: response.data.total_spent || 0
        });
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMessage('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      full_name: user.full_name || '',
      email: user.email || '',
      phone_number: user.phone_number || ''
    });
    setMessage('');
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');

    try {
      // In a real app, you'd have an endpoint to update profile
      // For now, we'll just update the local state
      const updatedUser = {
        ...user,
        ...editForm
      };
      setUser(updatedUser);
      setIsEditing(false);
      setMessage('ប្រូហ្វាលត្រូវបានធ្វើបច្ចុប្បន្នភាពដោយជោគជ័យ!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពប្រូហ្វាល។ សូមព្យាយាមម្តងទៀត។');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'គ្មានកាលបរិច្ឆេទ';
    const date = new Date(dateString);
    return date.toLocaleDateString('km-KH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 khmer-text">ចំនួនការបញ្ជាទិញ</h3>
                  <p className="text-2xl font-bold text-indigo-600">{userStats.totalOrders}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 khmer-text">ចំណាយសរុប</h3>
                  <p className="text-2xl font-bold text-green-600">${userStats.totalSpent}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 khmer-text">គណនីរបស់ខ្ញុំ</h1>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 khmer-text"
                >
                  កែប្រែប្រូហ្វាល
                </button>
              )}
            </div>
            
            {message && (
              <div className={`mb-4 p-3 rounded-lg ${
                message.includes('ជោគជ័យ') 
                  ? 'bg-green-50 border border-green-200 text-green-700' 
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {message}
              </div>
            )}
            
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 khmer-text mb-1">ឈ្មោះអ្នកប្រើ</label>
                  <input
                    type="text"
                    name="full_name"
                    value={editForm.full_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 khmer-text mb-1">អ៊ីមែល</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 khmer-text mb-1">លេខទូរស័ព្ទ</label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={editForm.phone_number}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 khmer-text"
                  >
                    {loading ? 'កំពុងរក្សាទុក...' : 'រក្សាទុក'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 khmer-text"
                  >
                    បោះបង់
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 khmer-text">ឈ្មោះអ្នកប្រើ</label>
                  <p className="mt-1 text-sm text-gray-900">{user?.username || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 khmer-text">ឈ្មោះពេញ</label>
                  <p className="mt-1 text-sm text-gray-900">{user?.full_name || 'មិនបានកំណត់'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 khmer-text">អ៊ីមែល</label>
                  <p className="mt-1 text-sm text-gray-900">{user?.email || 'មិនបានកំណត់'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 khmer-text">លេខទូរស័ព្ទ</label>
                  <p className="mt-1 text-sm text-gray-900">{user?.phone_number || 'មិនបានកំណត់'}</p>
                </div>
                
                {user?.created_at && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 khmer-text">កាលបរិច្ឆេទចូលរួម</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(user.created_at)}</p>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 khmer-text"
              >
                ចាកចេញ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

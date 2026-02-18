import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ordersAPI } from '../services/api';

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      console.log('Fetching user orders...');
      const response = await ordersAPI.getOrders();
      console.log('Orders response:', response.data);
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      
      let errorMessage = 'បរាជ័យក្នុងការទាញយកទិន្នន័យការបញ្ជាទិញ';
      
      if (error.response?.status === 401) {
        errorMessage = 'សូមចូលប្រើប្រាស់ឡើងវិញ';
      } else if (error.code === 'NETWORK_ERROR') {
        errorMessage = 'មិនអាចតភ្ជាប់ទៅម៉ាស៊ីនមេ';
      }
      
      setError(errorMessage);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
        case 'delivered': return 'bg-green-100 text-green-800';
        case 'completed': return 'bg-green-100 text-green-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'confirmed': return 'bg-blue-100 text-blue-800';
        case 'processing': return 'bg-purple-100 text-purple-800';
        case 'shipped': return 'bg-indigo-100 text-indigo-800';
        case 'cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
        case 'delivered': return 'បានដឹកជញ្ជូន';
        case 'completed': return 'បញ្ចប់';
        case 'pending': return 'កំពុងរង់ចាំ';
        case 'confirmed': return 'បានបញ្ជាក់';
        case 'processing': return 'កំពុងដំណើរការ';
        case 'shipped': return 'បានផ្ញើ';
        case 'cancelled': return 'បានបដិសេធ';
        default: return status;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'គ្មានកាលបរិច្ឆេទ';
    const date = new Date(dateString);
    return date.toLocaleDateString('km-KH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 khmer-text">សូមចូលប្រើប្រាស់</h1>
            <p className="text-gray-600 mb-8 khmer-text">អ្នកត្រូវចូលប្រើប្រាស់ដើម្បីមើលប្រវត្តិការបញ្ជាទិញ</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 khmer-text">ប្រវត្តិការបញ្ជាទិញ</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {orders.length === 0 && !error ? (
          <div className="text-center py-12">
            <p className="text-gray-500 khmer-text">អ្នកមិនទាន់មានការបញ្ជាទិញទេ</p>
            <a href="/products" className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 khmer-text">
              ទៅទិញទំនិញ
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{order.order_number}</h3>
                    <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${order.total_amount}</p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
                
                {order.shipping_address && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1 khmer-text">អាសយដ្ឋានដឹកជញ្ជូន</h4>
                    <p className="text-sm text-gray-600">{order.shipping_address}</p>
                  </div>
                )}
                
                {order.phone_number && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1 khmer-text">លេខទូរស័ព្ទ</h4>
                    <p className="text-sm text-gray-600">{order.phone_number}</p>
                  </div>
                )}
                
                {order.order_items && order.order_items.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2 khmer-text">ទំនិញដែលបានបញ្ជាទិញ</h4>
                    <div className="space-y-2">
                      {order.order_items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded">
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.product?.name || `ផលិតផល #${item.product_id}`}
                            </p>
                            <p className="text-gray-600">
                              {item.quantity} x ${item.unit_price}
                            </p>
                          </div>
                          <p className="font-medium text-gray-900">
                            ${item.total_price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {order.notes && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1 khmer-text">កំណត់សម្គាល់</h4>
                    <p className="text-sm text-gray-600">{order.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ordersAPI } from '../services/api';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shipping_address: '',
    phone_number: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!formData.shipping_address || !formData.phone_number) {
      alert('សូមបំពេញព័ត៌មានទំនាក់ទំនងឱ្យបានគ្រប់គ្រាន់');
      return;
    }

    setLoading(true);
    
    try {
      console.log('Creating order with data:', {
        ...formData,
        order_items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity
        }))
      });

      const orderData = {
        shipping_address: formData.shipping_address,
        phone_number: formData.phone_number,
        notes: formData.notes,
        order_items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity
        }))
      };

      const response = await ordersAPI.createOrder(orderData);
      console.log('Order created successfully:', response.data);
      
      alert('ការបញ្ជាទិញបានជោគជ័យ!');
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Order creation error:', error);
      
      let errorMessage = 'ការបញ្ជាទិញបរាជ័យ។ សូមព្យាយាមម្តងទៀត។';
      
      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail.map(err => err.msg).join(', ');
        } else {
          errorMessage = error.response.data.detail;
        }
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 khmer-text">រទេះទិញទំនិញទទេ</h1>
            <Link to="/products" className="btn-primary">
              ទៅកាន់ផលិតផល
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 khmer-text">ការទូទាត់ប្រាក់</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 khmer-text">ព័ត៌មានការដឹកជញ្ជូន</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 khmer-text">
                    អាសយដ្ឋានដឹកជញ្ជូន *
                  </label>
                  <textarea
                    name="shipping_address"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="input-field"
                    placeholder="បញ្ចូលអាសយដ្ឋានដឹកជញ្ជូន..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 khmer-text">
                    លេខទូរស័ព្ទ *
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="បញ្ចូលលេខទូរស័ព្ទ..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 khmer-text">
                    �ំណត់សម្គាល់
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="input-field"
                    placeholder="កំណត់សម្គាល់បន្ថែម (ជម្រើស)..."
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full"
                  >
                    {loading ? 'កំពុងដំណើរការ...' : 'បញ្ជាក់ការបញ្ជាទិញ'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 khmer-text">សង្ខេបការបញ្ជាទិញ</h2>
              
              <div className="space-y-2 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 khmer-text">សរុបរង:</span>
                    <span className="text-gray-900">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 khmer-text">ដឹកជញ្ជូន:</span>
                    <span className="text-gray-900">$5.00</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="khmer-text">សរុប:</span>
                    <span>${(getCartTotal() + 5).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Link to="/cart" className="btn-secondary w-full text-center inline-block">
                ត្រឡប់ទៅរទេះ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

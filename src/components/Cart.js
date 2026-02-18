import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 khmer-text">រទេះទិញទំនិញរបស់អ្នក</h1>
            <p className="text-gray-600 mb-8 khmer-text">រទេះទិញទំនិញរបស់អ្នកទទេ</p>
            <Link to="/products" className="btn-primary">
              បន្តទិញទំនិញ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 khmer-text">រទេះទិញទំនិញរបស់អ្នក</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider khmer-text">
                        ផលិតផល
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider khmer-text">
                        តម្លៃ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider khmer-text">
                        ចំនួន
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider khmer-text">
                        សរុប
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        សកម្មភាព
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {item.image_url ? (
                              <img
                                src={`http://localhost:8000${item.image_url.startsWith('/') ? '' : '/'}${item.image_url}`}
                                alt={item.name}
                                className="h-12 w-12 rounded-lg object-cover mr-4"
                              />
                            ) : (
                              <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-gray-500 text-xs">រូប</span>
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900 khmer-text">
                                {item.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${item.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-900 khmer-text"
                          >
                            លុប
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 khmer-text">សង្ខេបការបញ្ជាទិញ</h2>
              
              <div className="space-y-2 mb-4">
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
              
              <Link
                to="/checkout"
                className="btn-primary w-full text-center inline-block"
              >
                បន្តទៅកាន់ការទូទាត់ប្រាក់
              </Link>
              
              <Link
                to="/products"
                className="btn-secondary w-full text-center inline-block mt-3"
              >
                បន្តទិញទំនិញ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

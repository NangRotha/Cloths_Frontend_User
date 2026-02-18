import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { productsAPI } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsAPI.getProduct(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 khmer-text">រកមិនឃើញផលិតផល</h1>
          <Link to="/products" className="btn-primary">
            ត្រឡប់ទៅកាន់ផលិតផល
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                {product.image_url ? (
                  <img
                    src={`http://localhost:8000${product.image_url.startsWith('/') ? '' : '/'}${product.image_url}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-4xl">រូប</span>
                  </div>
                )}
              </div>
              
              <div className="md:w-1/2 p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 khmer-text">
                  {product.name}
                </h1>
                
                <p className="text-3xl font-bold text-indigo-600 mb-4">
                  ${product.price}
                </p>
                
                <p className="text-gray-600 mb-6 khmer-text">
                  {product.description}
                </p>
                
                <div className="mb-6">
                  <span className="text-sm text-gray-500 khmer-text">ស្តុក:</span>
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {product.stock_quantity} ប្រអប់
                  </span>
                </div>
                
                <div className="mb-6">
                  <span className="text-sm text-gray-500 khmer-text">ប្រភេទ:</span>
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {product.category}
                  </span>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2 khmer-text">
                    ចំនួន
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l hover:bg-gray-300"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border-t border-b border-gray-200 py-1"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="btn-primary flex-1"
                    disabled={product.stock_quantity === 0}
                  >
                    {product.stock_quantity === 0 ? 'អស់ស្តុក' : 'បញ្ចូលក្នុងរទេះ'}
                  </button>
                  <Link to="/products" className="btn-secondary">
                    ត្រឡប់
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

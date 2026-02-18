import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { productsAPI } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [successMessage, setSuccessMessage] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products from backend...');
      const response = await productsAPI.getProducts();
      console.log('Products response:', response.data);
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      
      let errorMessage = 'បរាជ័យក្នុងការទាញយកទិន្នន័យផលិតផល';
      
      if (error.response?.status === 401) {
        errorMessage = 'សូមចូលប្រើប្រាស់ឡើងវិញ';
      } else if (error.code === 'NETWORK_ERROR') {
        errorMessage = 'មិនអាចតភ្ជាប់ទៅម៉ាស៊ីនមេ';
      }
      
      console.error('Products error message:', errorMessage);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    try {
      addToCart(product);
      const productName = typeof product.name === 'string' ? product.name : 'ផលិតផល';
      setSuccessMessage(`បានបញ្ចូល "${productName}" ក្នុងរទេះ!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setSuccessMessage('មានបញ្ហាក្នុងការបញ្ចូលក្នុងរទេះ');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesSearch = (typeof product.name === 'string' && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (typeof product.description === 'string' && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === '全部' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'stock':
          return (b.stock_quantity || 0) - (a.stock_quantity || 0);
        default:
          return 0;
      }
    });

  const categories = ['全部', ...new Set(products.map(product => product.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 khmer-text">កំពុងផ្ទុកផលិតផល...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {successMessage && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 animate-pulse">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {successMessage}
            </div>
          </div>
        )}
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 khmer-text bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ផលិតផលទាំងអស់
          </h1>
          <p className="text-xl text-gray-600 khmer-text max-w-2xl mx-auto">
            ស្វែងរកសម្លៀកបំពាក់ដែលអ្នកចូលចិត្ត - គុណភាពខ្ពស់ តម្លៃសមរម្យ
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 khmer-text">
                ស្វែងរកផលិតផល
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="វាយបញ្ចូលឈ្មោះផលិតផល..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
                <svg className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 khmer-text">
                ប្រភេទ
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {typeof category === 'string' ? category : 'ផ្សេងៗ'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 khmer-text">
                តម្រៀបតាម
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              >
                <option value="name">ឈ្មោះ</option>
                <option value="price-low">តម្លៃទាប</option>
                <option value="price-high">តម្លៃខ្ពស់</option>
                <option value="stock">ស្តុកច្រើន</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600 khmer-text">
              រកឃើញ {filteredAndSortedProducts.length} ផលិតផល
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('全部');
                setSortBy('name');
              }}
              className="text-sm text-indigo-600 hover:text-indigo-800 khmer-text transition-colors duration-200"
            >
              សម្អាតតម្រូវការ
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-8">
              <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 khmer-text">រកមិនឃើញផលិតផល</h3>
            <p className="text-gray-600 khmer-text mb-4">សូមព្យាយាមផ្លាស់ប្តូរពាក្យស្វែងរក ឬតម្រូវការរបស់អ្នក</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('全部');
              }}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 khmer-text"
            >
              សម្អាតតម្រូវការ
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                {product.image_url ? (
                  <div className="relative overflow-hidden">
                    <img
                      src={`http://localhost:8000${product.image_url.startsWith('/') ? '' : '/'}${product.image_url}`}
                      alt={product.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.stock_quantity === 0 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold khmer-text">
                          អស់ស្តុក
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link
                        to={`/products/${product.id}`}
                        className="bg-white text-indigo-600 p-2 rounded-full shadow-lg hover:bg-indigo-50 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-56 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-4xl">👕</span>
                  </div>
                )}
                <div className="p-5">
                  <div className="mb-3">
                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full khmer-text">
                      {product.category || 'ទូទៅ'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 khmer-text group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-indigo-600 mb-3">${product.price}</p>
                  <p className="text-gray-600 mb-4 khmer-text line-clamp-2 text-sm">
                    {product.description || 'ផលិតផលគុណភាពខ្ពស់សម្រាប់អ្នក'}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm font-medium khmer-text ${
                      product.stock_quantity > 10 ? 'text-green-600' : 
                      product.stock_quantity > 0 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      ស្តុក: {product.stock_quantity}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 khmer-text ${
                        product.stock_quantity === 0 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 shadow-lg'
                      }`}
                      disabled={product.stock_quantity === 0}
                    >
                      {product.stock_quantity === 0 ? 'អស់ស្តុក' : 'បញ្ចូលក្នុងរទេះ'}
                    </button>
                    <Link
                      to={`/products/${product.id}`}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

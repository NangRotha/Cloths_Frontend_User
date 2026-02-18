import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 khmer-text">ហាងសម្លៀកបំពាក់</h3>
            <p className="text-gray-300 khmer-text">
              ផ្តល់ជូនសម្លៀកបំពាក់គុណភាពខ្ពស់ តម្លៃសមរម្យ សម្រាប់អតិថិជនគ្រប់រូប
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 khmer-text">តំណភ្លាម៍</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white khmer-text">ទំព័រដើម</a>
              </li>
              <li>
                <a href="/products" className="text-gray-300 hover:text-white khmer-text">ផលិតផល</a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white khmer-text">អំពីយើង</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white khmer-text">ទំនាក់ទំនង</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 khmer-text">ប្រភេទផលិតផល</h4>
            <ul className="space-y-2">
              <li>
                <a href="/products?category=អាវ" className="text-gray-300 hover:text-white khmer-text">អាវ</a>
              </li>
              <li>
                <a href="/products?category=ខោ" className="text-gray-300 hover:text-white khmer-text">ខោ</a>
              </li>
              <li>
                <a href="/products?category=ស្រោមជើង" className="text-gray-300 hover:text-white khmer-text">ស្រោមជើង</a>
              </li>
              <li>
                <a href="/products?category=សំលៀកបំពាក់" className="text-gray-300 hover:text-white khmer-text">សំលៀកបំពាក់</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 khmer-text">ទំនាក់ទំនង</h4>
            <div className="space-y-2">
              <p className="text-gray-300 khmer-text">
                <strong>អាសយដ្ឋាន:</strong> ភ្នំពេញ, កម្ពុជា
              </p>
              <p className="text-gray-300 khmer-text">
                <strong>ទូរស័ព្ទ:</strong> 012 345 678
              </p>
              <p className="text-gray-300 khmer-text">
                <strong>អ៊ីមែល:</strong> info@cloth.com
              </p>
            </div>
            
            <div className="mt-4 flex space-x-4">
              <button className="text-gray-300 hover:text-white" aria-label="Facebook">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="text-gray-300 hover:text-white" aria-label="Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button className="text-gray-300 hover:text-white" aria-label="Instagram">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 khmer-text">
            &copy; 2024 ហាងសម្លៀកបំពាក់. រក្សាសិទ្ធិគ្រប់យ៉ាង.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

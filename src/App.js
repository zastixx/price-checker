import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import HistorySidebar from './HistorySidebar';

function App() {
  const [productUrl, setProductUrl] = useState('');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  // New state for sidebar visibility
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productUrl) {
      setError('Please provide a product URL');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:5000/scrape', { product_url: productUrl });
      setProductData(response.data);
      const updatedHistory = [...history, productUrl];
      setHistory(updatedHistory);
      // Save updated history to localStorage
      localStorage.setItem('history', JSON.stringify(updatedHistory));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch product data');
    } finally {
      setLoading(false);
    }
  };

  // New function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="App">
      <header className="flex items-center justify-center bg-gray-100 p-5 shadow-md">
        <img src="logo-placeholder.png" alt="Logo" className="h-10 mr-5" />
        <h1 className="text-2xl font-bold">Price Checker</h1>
      </header>
      <form onSubmit={handleSubmit} className="my-5">
        <input
          type="text"
          placeholder="Enter product URL"
          value={productUrl}
          onChange={(e) => setProductUrl(e.target.value)}
          className="p-2 w-full max-w-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {error && <p className="text-red-500 mt-1">{error}</p>}
        <button type="submit" className="p-2 px-5 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Check Price</button>
      </form>

      {/* New button to toggle sidebar */}
      <button onClick={toggleSidebar} className="p-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200">
        {isSidebarVisible ? 'Hide History' : 'Show History'}
      </button>

      {loading && <div className="my-5"><p className="text-gray-500">Fetching product details...</p></div>}

      {productData && (
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Product Details</h2>
          <p><strong>Price:</strong> <span className="text-lg font-bold">{productData.price?.currency}{productData.price?.value}</span></p>
          {productData.thumbnailImage && <img src={productData.thumbnailImage} alt="Product" className="rounded-lg max-w-full shadow-lg" />}
        </div>
      )}

      {/* Conditionally render the sidebar */}
      {isSidebarVisible && <HistorySidebar history={history} />}

      <footer className="mt-5 text-sm text-gray-600">
        <p>Contact us for support</p>
      </footer>
    </div>
  );
}

export default App;

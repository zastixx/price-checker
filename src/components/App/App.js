import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProductDetails from '../ProductDetails/ProductDetails';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProductPage from '../ProductPage/ProductPage';


function App() {
  const navigate = useNavigate();
  const [productUrl, setProductUrl] = useState('');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

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
      const newProduct = {
        ...response.data,
        url: productUrl,
        description: response.data.description || 'No description available',
        timestamp: new Date().toISOString()
      };
      setProductData(newProduct);
      
      // Add to search history
      setSearchHistory(prevHistory => {
        const updatedHistory = [newProduct, ...prevHistory];
        return updatedHistory.slice(0, 10);
      });
      
      // Navigate to product page
      navigate('/product', { state: { productData: newProduct } });
      
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch product data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <div className="search-container">
              <h1 className="search-title">Find product prices instantly</h1>
              <p className="search-subtitle">Enter a product URL to check its current price</p>
              
              <form onSubmit={handleSubmit} className="search-form">
                <div className="search-input-container">
                  <input
                    type="text"
                    placeholder="Paste product URL here..."
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-button" disabled={loading}>
                    {loading ? (
                      <span className="loading-spinner"></span>
                    ) : (
                      'Search'
                    )}
                  </button>
                </div>
                {error && <p className="error-message">{error}</p>}
              </form>

              {loading && (
                <div className="loading-container">
                  <div className="loading-spinner-large"></div>
                  <p>Searching for product details...</p>
                </div>
              )}
            </div>

            {productData && <ProductDetails productData={productData} />}
            
            

            <Footer />
          </>
        } />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
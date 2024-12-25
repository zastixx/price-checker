import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductDetails from '../ProductDetails/ProductDetails';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function ProductPage() {
  const location = useLocation();
  const { productData } = location.state;

  return (
    <div className="product-page">
      <Header />
      <div className="product-container">
        <ProductDetails productData={productData} />
      </div>
      <Footer />
    </div>
  );
}

export default ProductPage; 
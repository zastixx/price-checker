import React, { useState } from 'react';
import './ProductDetails.css';
import { Carousel } from 'react-bootstrap';

const ProductDetails = ({ productData }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  if (!productData) return null;

  // Format product data
  const formattedProductData = {
    images: productData.images || [],
    aPlusContentImages: productData.aPlusContent?.rawImages?.map(image => image.url) || [],
    name: productData.name || 'Product',
    title: productData.title || 'Product Title',
    price: {
      currency: productData.price?.currency || '$',
      value: productData.price?.value || '0.00'
    }
  };

  return (
    <div className="product-details">
      <div className="product-image-container">
        {formattedProductData.aPlusContentImages.length > 0 ? (
          <Carousel>
            {formattedProductData.aPlusContentImages.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={image}
                  alt={`${formattedProductData.name} Image ${index + 1}`}
                  className="product-image"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <img src={formattedProductData.images[0]} alt={formattedProductData.name} className="product-image" />
        )}
      </div>

      <div className="product-info">
        <h1 className="product-title">{formattedProductData.title}</h1>

        <p className="product-description">
          {formattedProductData.description}
        </p>

        <div className="price-tag" style={{ display: 'flex', justifyContent: 'center' }}>
          <span className="currency"><b>{formattedProductData.price.currency}</b></span>
          <span className="price-value"><b>{formattedProductData.price.value}</b></span>
        </div>

        <div className="limited-time-offer">
          <span>Hurry up! This is the lowest price ever!</span>
          <div className="dummy-clock">Offer runs out soon!</div>
        </div>

        <button className="get-alert" onClick={() => alert('Button clicked!')}>
          GET ALERT
          <span className="bell-icon">🔔</span>
        </button>

        <button className="buy-amazon-button" onClick={() => window.location.href = productData.url}>
          BUY @ AMAZON.IN
        </button>
        
      <div className="green-blob"></div>

        
      </div>
      <div className="faq-section" style={{ textAlign: 'left', marginTop: '2rem', animation: 'fadeIn 1s ease-in-out' }}>
        <div className="faq-container">
          <div className="faq-content">
            <h2>Frequently Asked Questions</h2>
            {[
              {
                question: "What is Price History App?",
                answer: "Price History App is a free online tool that allows you to check price history charts for millions of products."
              },
              {
                question: "How does Price History App work?",
                answer: "We track the product's price on various marketplaces and notify you of any changes."
              },
              {
                question: "Is Price History App free to use?",
                answer: "Yes, Price History App is completely free to use for all users."
              },
              {
                question: "Can I receive notifications for price changes?",
                answer: "Yes, you can opt to receive notifications when there are changes in the product's price."
              }
            ].map((faq, index) => (
              <div key={index} className="faq-item" style={{ animation: 'slideIn 0.5s ease-in-out', animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}>
                <h3 onClick={(e) => {
                  const p = e.currentTarget.nextElementSibling;
                  const isActive = p.style.display === 'block';
                  p.style.display = isActive ? 'none' : 'block';
                  e.currentTarget.classList.toggle('active', !isActive);
                }}>
                  {faq.question}
                </h3>
                <p style={{ display: 'none' }}>{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="faq-image-box">
            {/* This is a placeholder box that can later be filled with an image */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <h1 className="navbar-title">Product Scraper</h1>
        </div>
        <div className="navbar-center">
          <ul className="navbar-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="navbar-right">
          <button className="sign-in-btn">Sign In</button>
          <button className="start-for-free-btn">Start for Free</button>
          <button className="help-btn">
            <span className="help-icon">?</span>
            Help
          </button>
          <button className="cart-btn">
            <span className="cart-icon">🛒</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;

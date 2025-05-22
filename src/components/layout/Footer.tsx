
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-shop-darker py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">MyShop</h3>
            <p className="text-shop-text-muted">
              Your premier destination for premium products. Quality and style redefined.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-shop-text-muted hover:text-shop-accent">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-shop-text-muted hover:text-shop-accent">Products</Link>
              </li>
              <li>
                <Link to="/cart" className="text-shop-text-muted hover:text-shop-accent">Cart</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-shop-text-muted hover:text-shop-accent">Contact Us</a>
              </li>
              <li>
                <a href="#" className="text-shop-text-muted hover:text-shop-accent">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-shop-text-muted hover:text-shop-accent">Shipping Policy</a>
              </li>
              <li>
                <a href="#" className="text-shop-text-muted hover:text-shop-accent">Returns & Exchanges</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Newsletter</h4>
            <p className="text-shop-text-muted mb-4">Subscribe to get special offers and updates.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-shop-light border border-shop-border px-3 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-shop-accent flex-grow"
              />
              <button className="bg-shop-accent hover:bg-shop-accent-hover text-white px-4 py-2 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-shop-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-shop-text-muted text-sm">
            &copy; {new Date().getFullYear()} MyShop. All Rights Reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-shop-text-muted hover:text-shop-accent">
              Privacy Policy
            </a>
            <a href="#" className="text-shop-text-muted hover:text-shop-accent">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

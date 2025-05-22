
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  
  const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <nav className="bg-shop-darker py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-shop-text text-2xl font-bold no-underline hover:text-shop-text">
            MyShop
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-shop-text hover:text-shop-accent no-underline">
              Home
            </Link>
            <Link to="/products" className="text-shop-text hover:text-shop-accent no-underline">
              Products
            </Link>
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-shop-light rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-shop-accent w-64"
              />
              <Search className="absolute left-3 text-shop-text-muted" size={18} />
            </div>
          </div>
          
          {/* Cart and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative text-shop-text hover:text-shop-accent">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-shop-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden text-shop-text focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-shop-light rounded-md p-4 animate-fade-in shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-shop-text hover:text-shop-accent no-underline px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-shop-text hover:text-shop-accent no-underline px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/admin" 
                className="text-shop-text hover:text-shop-accent no-underline px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              <div className="relative flex items-center mt-2">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="bg-shop-dark rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-shop-accent w-full"
                />
                <Search className="absolute left-3 text-shop-text-muted" size={18} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

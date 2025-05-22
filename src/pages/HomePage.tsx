
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/data/products';

const HomePage = () => {
  // Get featured products
  const featuredProducts = products.filter(product => product.featured);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-shop-darker py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Discover Premium Products for Modern Living
              </h1>
              <p className="text-lg text-shop-text-muted mb-8 max-w-lg">
                Curated selection of high-quality electronics, home decor, and accessories 
                to elevate your lifestyle.
              </p>
              <Link to="/products" className="btn-primary text-lg px-8 py-3">
                Shop Now
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1000&h=800"
                alt="Premium Electronics"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="flex items-center text-shop-accent hover:text-shop-accent-hover">
              View All Products <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-shop-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Electronics', 'Furniture', 'Home Decor', 'Accessories'].map((category) => (
              <div key={category} className="relative rounded-lg overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-shop-darker to-transparent z-10"></div>
                <img 
                  src={`https://source.unsplash.com/random/300x400/?${category.toLowerCase()}`} 
                  alt={category}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-xl font-medium text-white mb-2">{category}</h3>
                  <Link 
                    to={`/products?category=${category}`}
                    className="text-shop-accent group-hover:text-white transition-colors"
                  >
                    View Products
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 bg-shop-accent bg-opacity-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Newsletter</h2>
          <p className="text-shop-text-muted mb-8 max-w-xl mx-auto">
            Subscribe to get special offers, free giveaways, and updates about our newest products.
          </p>
          <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-l-md bg-shop-light border border-shop-border flex-grow focus:outline-none focus:ring-2 focus:ring-shop-accent mb-3 sm:mb-0"
            />
            <button className="btn-primary rounded-r-md px-6 sm:ml-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;

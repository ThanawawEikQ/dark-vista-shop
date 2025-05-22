
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/products/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-shop-text-muted mb-8">
            The product you are looking for might have been removed or doesn't exist.
          </p>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Related products - same category, excluding current product
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/products" className="flex items-center mb-6 hover:text-shop-accent">
          <ArrowLeft size={18} className="mr-2" />
          Back to Products
        </Link>
        
        {/* Product Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-16">
          {/* Product Image */}
          <div className="bg-shop-light rounded-lg overflow-hidden">
            <img 
              src={`${product.image}?auto=format&fit=crop&w=800&h=800`}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div>
            {product.featured && (
              <div className="inline-block bg-shop-accent px-3 py-1 text-white text-sm font-medium rounded-full mb-4">
                Featured
              </div>
            )}
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-medium mb-6">${product.price.toFixed(2)}</p>
            
            <div className="text-shop-text-muted mb-8">
              {product.description}
            </div>
            
            <div className="mb-6">
              <div className="text-sm text-shop-text-muted mb-2">Availability:</div>
              {product.stock > 0 ? (
                <div className="text-shop-success font-medium">In Stock ({product.stock} available)</div>
              ) : (
                <div className="text-shop-error font-medium">Out of Stock</div>
              )}
            </div>
            
            {product.stock > 0 && (
              <>
                <div className="mb-6">
                  <label className="text-sm text-shop-text-muted mb-2 block">
                    Quantity:
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="btn-outline p-2 rounded-l-md rounded-r-none"
                      disabled={quantity <= 1}
                    >
                      <Minus size={18} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value >= 1 && value <= product.stock) {
                          setQuantity(value);
                        }
                      }}
                      className="border-t border-b border-shop-border h-10 w-16 text-center bg-shop-dark"
                    />
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="btn-outline p-2 rounded-r-md rounded-l-none"
                      disabled={quantity >= product.stock}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex items-center justify-center w-full py-3"
                >
                  <ShoppingCart className="mr-2" size={20} />
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;

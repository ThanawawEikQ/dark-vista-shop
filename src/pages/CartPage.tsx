
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash, ArrowRight, ShoppingCart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cart.items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart size={64} className="mx-auto mb-4 text-shop-text-muted" />
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-shop-text-muted mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-shop-light rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-medium mb-6">Cart Items ({cart.items.length})</h2>
                  
                  {cart.items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-t border-shop-border">
                      <div className="flex-shrink-0 w-24 h-24 bg-shop-dark rounded-md overflow-hidden mr-6 mb-4 sm:mb-0">
                        <img 
                          src={`${product.image}?auto=format&fit=crop&w=200&h=200`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <Link to={`/product/${product.id}`} className="text-lg font-medium hover:text-shop-accent">
                          {product.name}
                        </Link>
                        <p className="text-shop-text-muted text-sm mb-3">{product.category}</p>
                        <p className="font-medium">${product.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center mt-4 sm:mt-0">
                        <div className="flex items-center mr-6">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="btn-outline !p-1 rounded-l-md rounded-r-none"
                            disabled={quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="number"
                            value={quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (value >= 1 && value <= product.stock) {
                                updateQuantity(product.id, value);
                              }
                            }}
                            className="border-t border-b border-shop-border h-8 w-12 text-center bg-shop-dark"
                            min="1"
                            max={product.stock}
                          />
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="btn-outline !p-1 rounded-r-md rounded-l-none"
                            disabled={quantity >= product.stock}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-shop-text-muted hover:text-shop-error transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-shop-light rounded-lg overflow-hidden sticky top-20">
                <div className="p-6">
                  <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-shop-text-muted">Subtotal</span>
                      <span>${cart.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-shop-text-muted">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-shop-text-muted">Tax</span>
                      <span>${(cart.total * 0.1).toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-shop-border pt-4 mt-4">
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>${(cart.total + cart.total * 0.1).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    to="/checkout"
                    className="btn-primary w-full flex items-center justify-center py-3"
                  >
                    Proceed to Checkout <ArrowRight size={18} className="ml-2" />
                  </Link>
                  
                  <Link 
                    to="/products"
                    className="block text-center mt-4 text-shop-accent hover:text-shop-accent-hover"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;

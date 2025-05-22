
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { Check, Loader } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    // Validate form
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        toast.error(`Please enter your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }
    
    setIsSubmitting(true);
    
    // Simulate payment API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success (you can add random failure if needed)
      setPaymentSuccess(true);
      
      // Clear cart after successful payment
      setTimeout(() => {
        clearCart();
        navigate('/checkout/confirmation');
      }, 1500);
      
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // If no items in cart, redirect to cart
  if (cart.items.length === 0 && !paymentSuccess) {
    navigate('/cart');
    return null;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {paymentSuccess ? (
          <div className="bg-shop-light p-8 rounded-lg text-center">
            <div className="w-16 h-16 bg-shop-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Payment Successful!</h2>
            <p className="text-shop-text-muted mb-6">
              Thank you for your purchase. Redirecting to confirmation page...
            </p>
            <div className="animate-spin inline-block w-8 h-8 border-4 border-shop-text-muted border-t-shop-accent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-shop-light rounded-lg p-6">
                <h2 className="text-xl font-medium mb-6">Shipping & Payment Information</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6">
                    {/* Shipping Information */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="fullName" className="block text-sm text-shop-text-muted mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="input w-full"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm text-shop-text-muted mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="input w-full"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="address" className="block text-sm text-shop-text-muted mb-1">
                            Address
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="input w-full"
                            placeholder="123 Main St"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm text-shop-text-muted mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="input w-full"
                              placeholder="New York"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="zipCode" className="block text-sm text-shop-text-muted mb-1">
                              Zip Code
                            </label>
                            <input
                              type="text"
                              id="zipCode"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              className="input w-full"
                              placeholder="10001"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Payment Information */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Payment Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm text-shop-text-muted mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="input w-full"
                            placeholder="4242 4242 4242 4242"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="cardExpiry" className="block text-sm text-shop-text-muted mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              id="cardExpiry"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              className="input w-full"
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cardCvv" className="block text-sm text-shop-text-muted mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              id="cardCvv"
                              name="cardCvv"
                              value={formData.cardCvv}
                              onChange={handleInputChange}
                              className="input w-full"
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="btn-primary py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader size={20} className="animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        `Pay $${(cart.total + cart.total * 0.1).toFixed(2)}`
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="order-1 lg:order-2">
              <div className="bg-shop-light rounded-lg p-6">
                <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cart.items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center py-2">
                      <div className="flex-shrink-0 w-12 h-12 bg-shop-dark rounded-md overflow-hidden mr-4">
                        <img 
                          src={`${product.image}?auto=format&fit=crop&w=100&h=100`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-shop-text-muted">Qty: {quantity}</p>
                      </div>
                      <p className="font-medium">${(product.price * quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                {/* Price Summary */}
                <div className="border-t border-shop-border pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-shop-text-muted">Subtotal</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-shop-text-muted">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-shop-text-muted">Tax (10%)</span>
                    <span>${(cart.total * 0.1).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t border-shop-border mt-4 pt-4">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${(cart.total + cart.total * 0.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CheckoutPage;

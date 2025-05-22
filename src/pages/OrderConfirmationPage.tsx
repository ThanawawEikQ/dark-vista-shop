
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const OrderConfirmationPage = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  
  // Estimated delivery date (5-7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 5);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric' 
  });
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-shop-success bg-opacity-10 rounded-full mb-6">
            <CheckCircle size={40} className="text-shop-success" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-shop-text-muted mb-8 text-lg">
            Your order has been confirmed and will be shipping soon.
          </p>
          
          <div className="bg-shop-light rounded-lg p-6 mb-8 text-left">
            <div className="flex flex-col sm:flex-row justify-between mb-6">
              <div>
                <p className="text-shop-text-muted text-sm">Order Number:</p>
                <p className="font-medium">{orderNumber}</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <p className="text-shop-text-muted text-sm">Estimated Delivery:</p>
                <p className="font-medium">{formattedDeliveryDate}</p>
              </div>
            </div>
            
            <div className="border-t border-shop-border pt-6">
              <div className="flex items-center">
                <Package size={24} className="text-shop-accent mr-3" />
                <div>
                  <p className="font-medium">Shipping Update</p>
                  <p className="text-shop-text-muted text-sm">
                    You will receive shipping confirmation and tracking information when your order ships.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
            <Link to="/products" className="btn-outline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;

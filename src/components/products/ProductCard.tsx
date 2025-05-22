
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="card group transition-all duration-300 hover:shadow-lg hover:shadow-shop-accent/10">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            src={`${product.image}?auto=format&fit=crop&w=500&h=500`} 
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {product.featured && (
            <div className="absolute top-2 right-2 bg-shop-accent px-3 py-1 text-white text-xs font-medium rounded-full">
              Featured
            </div>
          )}
        </Link>
      </div>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="no-underline">
          <h3 className="text-lg font-medium mb-2 text-shop-text hover:text-shop-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-medium">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product, 1)}
            className="btn-primary !p-2"
            aria-label={`Add ${product.name} to cart`}
            disabled={product.stock <= 0}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
        
        <div className="mt-2 text-sm text-shop-text-muted">
          {product.stock > 0 ? (
            <span>{product.stock} in stock</span>
          ) : (
            <span className="text-shop-error">Out of stock</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


import React, { useState } from 'react';
import { Trash, Edit, Plus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { products as initialProducts, Product } from '@/data/products';
import { toast } from '@/components/ui/sonner';

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([...initialProducts]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    id: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    featured: false,
    stock: 0,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checkboxInput = e.target as HTMLInputElement;
      setCurrentProduct(prev => ({
        ...prev,
        [name]: checkboxInput.checked
      }));
    } else if (type === 'number') {
      setCurrentProduct(prev => ({
        ...prev,
        [name]: parseFloat(value)
      }));
    } else {
      setCurrentProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setIsAdding(false);
  };
  
  const handleAddNewProduct = () => {
    setCurrentProduct({
      id: `${products.length + 1}`,
      name: '',
      description: '',
      price: 0,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      category: '',
      featured: false,
      stock: 0,
    });
    setIsAdding(true);
    setIsEditing(false);
  };
  
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success("Product deleted successfully");
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentProduct.name || !currentProduct.description || !currentProduct.category || currentProduct.price <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (isEditing) {
      setProducts(products.map(product => 
        product.id === currentProduct.id ? currentProduct as Product : product
      ));
      toast.success("Product updated successfully");
      setIsEditing(false);
    } else if (isAdding) {
      setProducts([...products, currentProduct as Product]);
      toast.success("Product added successfully");
      setIsAdding(false);
    }
    
    setCurrentProduct({
      id: '',
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      featured: false,
      stock: 0,
    });
  };
  
  const cancelEdit = () => {
    setIsEditing(false);
    setIsAdding(false);
    setCurrentProduct({
      id: '',
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      featured: false,
      stock: 0,
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button 
            className="btn-primary flex items-center"
            onClick={handleAddNewProduct}
          >
            <Plus size={18} className="mr-2" />
            Add New Product
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product List */}
          <div className="lg:col-span-2">
            <div className="bg-shop-light rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-medium mb-6">Product Management</h2>
                
                {products.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-shop-text-muted">No products available. Add your first product!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-shop-text-muted border-b border-shop-border">
                          <th className="pb-3 pl-2">Product</th>
                          <th className="pb-3">Price</th>
                          <th className="pb-3">Stock</th>
                          <th className="pb-3 text-right pr-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id} className="border-b border-shop-border">
                            <td className="py-4 pl-2 flex items-center">
                              <div className="w-12 h-12 bg-shop-dark rounded-md overflow-hidden mr-4">
                                <img 
                                  src={`${product.image}?auto=format&fit=crop&w=100&h=100`}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-shop-text-muted">{product.category}</p>
                              </div>
                            </td>
                            <td className="py-4">${product.price.toFixed(2)}</td>
                            <td className="py-4">
                              <span className={`${
                                product.stock > 0 ? "text-shop-success" : "text-shop-error"
                              }`}>
                                {product.stock > 0 ? product.stock : "Out of stock"}
                              </span>
                            </td>
                            <td className="py-4 text-right pr-2">
                              <div className="flex justify-end">
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="text-shop-text p-2 hover:text-shop-accent"
                                  aria-label="Edit product"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-shop-text p-2 hover:text-shop-error"
                                  aria-label="Delete product"
                                >
                                  <Trash size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Product Form */}
          {(isEditing || isAdding) && (
            <div className="lg:col-span-1">
              <div className="bg-shop-light rounded-lg">
                <div className="p-6">
                  <h2 className="text-xl font-medium mb-6">
                    {isEditing ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-shop-text-muted mb-1">
                          Product Name*
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={currentProduct.name}
                          onChange={handleInputChange}
                          className="input w-full"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-shop-text-muted mb-1">
                          Description*
                        </label>
                        <textarea
                          name="description"
                          value={currentProduct.description}
                          onChange={handleInputChange}
                          className="input w-full h-24 resize-none"
                          required
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-shop-text-muted mb-1">
                          Price*
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={currentProduct.price}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          className="input w-full"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-shop-text-muted mb-1">
                          Category*
                        </label>
                        <select
                          name="category"
                          value={currentProduct.category}
                          onChange={handleInputChange}
                          className="input w-full"
                          required
                        >
                          <option value="" disabled>Select category</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Furniture">Furniture</option>
                          <option value="Home Decor">Home Decor</option>
                          <option value="Accessories">Accessories</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-shop-text-muted mb-1">
                          Image URL (Unsplash)
                        </label>
                        <input
                          type="text"
                          name="image"
                          value={currentProduct.image}
                          onChange={handleInputChange}
                          className="input w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-shop-text-muted mb-1">
                          Stock*
                        </label>
                        <input
                          type="number"
                          name="stock"
                          value={currentProduct.stock}
                          onChange={handleInputChange}
                          min="0"
                          className="input w-full"
                          required
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="featured"
                          name="featured"
                          checked={currentProduct.featured}
                          onChange={handleInputChange}
                          className="mr-2 h-4 w-4 rounded border-shop-border text-shop-accent focus:ring-shop-accent"
                        />
                        <label htmlFor="featured">
                          Featured product
                        </label>
                      </div>
                      
                      <div className="flex justify-end space-x-2 pt-4">
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="btn-outline"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn-primary"
                        >
                          {isEditing ? 'Update Product' : 'Add Product'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;

import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: {
    product: {
      _id: string;
      name: string;
      price: number;
      images: string[];
      stock: number;
    };
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > product.stock) return;
    
    try {
      await updateCartItem(product._id, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart(product._id);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b border-gray-200 last:border-b-0 gap-4">
      <div className="w-full sm:w-24 h-24 flex-shrink-0">
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover rounded-md"
          />
        </Link>
      </div>
      
      <div className="flex-grow">
        <Link 
          to={`/product/${product._id}`}
          className="text-lg font-['Fira_Sans'] font-semibold text-gray-800 hover:text-[#28DF99] transition-colors"
        >
          {product.name}
        </Link>
        
        <div className="mt-1 text-[#28DF99] font-bold">
          ${product.price.toFixed(2)}
        </div>
      </div>
      
      <div className="flex items-center border border-gray-300 rounded-md">
        <button 
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
          className="px-2 py-1 text-gray-600 hover:text-[#28DF99] disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>
        
        <span className="px-3 py-1 border-x border-gray-300 min-w-[40px] text-center">
          {quantity}
        </span>
        
        <button 
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={quantity >= product.stock}
          className="px-2 py-1 text-gray-600 hover:text-[#28DF99] disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="font-bold text-gray-800 w-24 text-right">
        ${(product.price * quantity).toFixed(2)}
      </div>
      
      <button 
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700 transition-colors"
        aria-label="Remove item"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default CartItem;
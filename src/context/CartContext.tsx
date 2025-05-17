import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
  };
  quantity: number;
}

interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Fetch cart when user changes
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setCart(null);
        return;
      }

      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/cart`, {
          withCredentials: true
        });
        setCart(data);
      } catch (err: any) {
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, API_URL]);

  // Add item to cart
  const addToCart = async (productId: string, quantity: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await axios.post(
        `${API_URL}/cart/add`,
        { productId, quantity },
        { withCredentials: true }
      );
      
      setCart(data);
      toast.success('Item added to cart!');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to add item to cart';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateCartItem = async (productId: string, quantity: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await axios.put(
        `${API_URL}/cart/update`,
        { productId, quantity },
        { withCredentials: true }
      );
      
      setCart(data);
      toast.success('Cart updated!');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update cart';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await axios.delete(`${API_URL}/cart/remove/${productId}`, {
        withCredentials: true
      });
      
      setCart(data);
      toast.success('Item removed from cart!');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to remove item from cart';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await axios.delete(`${API_URL}/cart/clear`, {
        withCredentials: true
      });
      
      setCart(prev => prev ? { ...prev, items: [] } : null);
      toast.success('Cart cleared!');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to clear cart';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
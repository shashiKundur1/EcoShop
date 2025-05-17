import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage: React.FC = () => {
  const { cart, loading, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#28DF99]"></div>
        </div>
      </div>
    );
  }
  
  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart size={64} className="text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4 font-['Fira_Sans']">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-6 font-['Fira_Sans']">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link
            to="/"
            className="bg-[#28DF99] text-white py-3 px-6 rounded-md hover:bg-[#20c085] transition-colors inline-block font-['Fira_Sans'] font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  // Calculate totals
  const subtotal = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 font-['Fira_Sans']">
        Your Shopping Cart
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 font-['Fira_Sans']">
                  Cart Items ({cart.items.reduce((acc, item) => acc + item.quantity, 0)})
                </h2>
                
                <button
                  onClick={() => clearCart()}
                  className="flex items-center text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={18} className="mr-1" />
                  Clear Cart
                </button>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cart.items.map(item => (
                  <CartItem key={item.product._id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 font-['Fira_Sans']">
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold">Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%):</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-[#28DF99]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="bg-[#28DF99] text-white py-3 px-6 rounded-md hover:bg-[#20c085] transition-colors w-full block text-center font-['Fira_Sans'] font-semibold"
              >
                Proceed to Checkout
              </Link>
              
              <Link
                to="/"
                className="flex items-center justify-center mt-4 text-[#28DF99] hover:text-[#20c085] transition-colors font-['Fira_Sans']"
              >
                Continue Shopping
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
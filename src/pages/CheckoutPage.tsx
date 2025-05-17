import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage: React.FC = () => {
  const { cart, loading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !user) {
      navigate('/login');
    }
    
    // Redirect if cart is empty
    if (!loading && (!cart || cart.items.length === 0)) {
      navigate('/cart');
    }
  }, [cart, user, loading, navigate]);
  
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
    return null; // Will redirect in useEffect
  }
  
  // Calculate total
  const subtotal = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 font-['Fira_Sans']">
        Checkout
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm totalPrice={subtotal} />
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 font-['Fira_Sans']">
                Order Items
              </h2>
              
              <div className="space-y-4 mb-6">
                {cart.items.map(item => (
                  <div key={item.product._id} className="flex items-center">
                    <div className="w-16 h-16 flex-shrink-0">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="ml-4 flex-grow">
                      <h3 className="text-sm font-medium text-gray-800 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="text-sm font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold">Free</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tax (10%):</span>
                  <span className="font-semibold">${(subtotal * 0.1).toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-[#28DF99]">${(subtotal * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
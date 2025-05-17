import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import confetti from '../utils/confetti';
import { useAuth } from '../context/AuthContext';

const OrderSuccessPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!user) {
      navigate('/login');
    }
    
    // Trigger confetti animation
    confetti();
    
    // Clear any remaining order data
    sessionStorage.removeItem('shippingAddress');
  }, [user, navigate]);
  
  if (!user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle size={80} className="text-[#28DF99]" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4 font-['Fira_Sans']">
            Order Placed Successfully!
          </h1>
          
          <p className="text-gray-600 mb-8 font-['Fira_Sans']">
            Thank you for your purchase. Your order has been received and is being processed.
            You will receive an email confirmation shortly.
          </p>
          
          <div className="bg-[#D2F6C5] rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 font-['Fira_Sans']">
              Order Details
            </h2>
            
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-600">Order Number:</p>
                <p className="font-semibold">#ORD-{Math.floor(100000 + Math.random() * 900000)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Date:</p>
                <p className="font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Payment Method:</p>
                <p className="font-semibold">Credit Card</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Shipping Method:</p>
                <p className="font-semibold">Standard Shipping</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-[#28DF99] text-white py-3 px-6 rounded-md hover:bg-[#20c085] transition-colors font-['Fira_Sans'] font-semibold flex items-center justify-center"
            >
              <ShoppingBag size={20} className="mr-2" />
              Continue Shopping
            </Link>
            
            <Link
              to="/profile"
              className="bg-white text-[#28DF99] border border-[#28DF99] py-3 px-6 rounded-md hover:bg-[#f8f8f8] transition-colors font-['Fira_Sans'] font-semibold"
            >
              View Order History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
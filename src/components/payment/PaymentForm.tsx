import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../../context/CartContext';

interface PaymentFormProps {
  totalPrice: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ totalPrice }) => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [loading, setLoading] = useState(false);

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const cleaned = value.replace(/\D+/g, '').slice(0, 16);
      const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
      setCardInfo(prev => ({ ...prev, cardNumber: formatted }));
    } else if (name === 'expiryDate') {
      let cleaned = value.replace(/\D+/g, '').slice(0, 4);
      if (cleaned.length >= 3) {
        cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
      }
      setCardInfo(prev => ({ ...prev, expiryDate: cleaned }));
    } else if (name === 'cvv') {
      const cleaned = value.replace(/\D+/g, '').slice(0, 4);
      setCardInfo(prev => ({ ...prev, cvv: cleaned }));
    } else {
      setCardInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const shippingAddressJson = sessionStorage.getItem('shippingAddress');
    if (!shippingAddressJson) {
      toast.error('Shipping information not found');
      navigate('/checkout');
      return;
    }

    const shippingAddress = JSON.parse(shippingAddressJson);

    if (!cart || cart.items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }

    if (paymentMethod === 'credit-card') {
      const cardNumberClean = cardInfo.cardNumber.replace(/\s/g, '');
      if (!cardInfo.cardNumber || !cardInfo.cardName || !cardInfo.expiryDate || !cardInfo.cvv) {
        toast.error('Please fill in all card details');
        return;
      }

      if (cardNumberClean.length !== 16) {
        toast.error('Invalid card number');
        return;
      }

      if (!/^\d{2}\/\d{2}$/.test(cardInfo.expiryDate)) {
        toast.error('Invalid expiry date format (MM/YY)');
        return;
      }

      if (!/^\d{3,4}$/.test(cardInfo.cvv)) {
        toast.error('Invalid CVV');
        return;
      }
    }

    try {
      setLoading(true);

      const orderItems = cart.items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.images[0]
      }));

      // Create order
      const createOrderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          orderItems,
          shippingAddress: {
            address: shippingAddress.address,
            city: shippingAddress.city,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country
          },
          paymentMethod,
          totalPrice: totalPrice * 1.1
        })
      });

      if (!createOrderResponse.ok) {
        const errData = await createOrderResponse.json();
        throw new Error(errData.message || 'Failed to create order');
      }

      const createdOrder = await createOrderResponse.json();

      // Mark as paid
      const payResponse = await fetch(`/api/orders/${createdOrder._id}/pay`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!payResponse.ok) {
        const errData = await payResponse.json();
        throw new Error(errData.message || 'Failed to mark order as paid');
      }

      await clearCart();
      sessionStorage.removeItem('shippingAddress');
      navigate('/order-success');

    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Method</h2>

        <div className="space-y-4">
          <div
            className={`border rounded-md p-4 cursor-pointer transition-colors ${
              paymentMethod === 'credit-card'
                ? 'border-[#28DF99] bg-[#D2F6C5]/30'
                : 'border-gray-300 hover:border-[#99F3BD]'
            }`}
            onClick={() => handlePaymentMethodChange('credit-card')}
          >
            <div className="flex items-center">
              <input
                type="radio"
                id="credit-card"
                name="paymentMethod"
                checked={paymentMethod === 'credit-card'}
                onChange={() => handlePaymentMethodChange('credit-card')}
                className="mr-2 accent-[#28DF99]"
              />
              <label htmlFor="credit-card" className="flex items-center cursor-pointer">
                <CreditCard size={20} className="mr-2 text-[#28DF99]" />
                <span className="font-medium">Credit / Debit Card</span>
              </label>
            </div>

            {paymentMethod === 'credit-card' && (
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardInfo.cardNumber}
                    onChange={handleCardInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#28DF99] focus:border-[#28DF99]"
                    maxLength={19}
                  />
                </div>

                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    value={cardInfo.cardName}
                    onChange={handleCardInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#28DF99] focus:border-[#28DF99]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={cardInfo.expiryDate}
                      onChange={handleCardInfoChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#28DF99] focus:border-[#28DF99]"
                      maxLength={5}
                    />
                  </div>

                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={cardInfo.cvv}
                      onChange={handleCardInfoChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#28DF99] focus:border-[#28DF99]"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className={`border rounded-md p-4 cursor-pointer transition-colors ${
              paymentMethod === 'cash-on-delivery'
                ? 'border-[#28DF99] bg-[#D2F6C5]/30'
                : 'border-gray-300 hover:border-[#99F3BD]'
            }`}
            onClick={() => handlePaymentMethodChange('cash-on-delivery')}
          >
            <div className="flex items-center">
              <input
                type="radio"
                id="cash-on-delivery"
                name="paymentMethod"
                checked={paymentMethod === 'cash-on-delivery'}
                onChange={() => handlePaymentMethodChange('cash-on-delivery')}
                className="mr-2 accent-[#28DF99]"
              />
              <label htmlFor="cash-on-delivery" className="flex items-center cursor-pointer">
                <DollarSign size={20} className="mr-2 text-[#28DF99]" />
                <span className="font-medium">Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-[#28DF99] text-white font-semibold rounded-md hover:bg-[#1ac38c] transition-colors"
        disabled={loading}
      >
        {loading ? 'Processing...' : `Pay ₹${(totalPrice * 1.1).toFixed(2)} (incl. tax)`}
      </button>
    </form>
  );
};

export default PaymentForm;

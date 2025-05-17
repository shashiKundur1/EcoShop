import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ShoppingCart, Heart, Share2, ArrowLeft, Star } from 'lucide-react';
import ProductImageGallery from '../components/common/ProductImageGallery';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  numReviews: number;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/products/${id}`
        );
        
        setProduct(data);
        
        // Fetch related products
        const { data: relatedData } = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/products?category=${data.category}&limit=4`
        );
        
        // Filter out the current product
        const filtered = relatedData.products.filter((p: Product) => p._id !== id);
        setRelatedProducts(filtered.slice(0, 3)); // Limit to 3 related products
        
      } catch (err: any) {
        setError(err.message || 'Failed to fetch product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else if (product && value > product.stock) {
      setQuantity(product.stock);
    } else {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = async () => {
    if (!product) return;
    
    if (!user) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    
    try {
      await addToCart(product._id, quantity);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };
  
  const handleBuyNow = async () => {
    if (!product) return;
    
    if (!user) {
      toast.error('Please login to purchase items');
      navigate('/login');
      return;
    }
    
    try {
      await addToCart(product._id, quantity);
      navigate('/checkout');
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} size={18} className="fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star 
          key="half-star" 
          size={18} 
          className="text-yellow-400"
          style={{ clipPath: 'inset(0 50% 0 0)', fill: 'currentColor' }}
        />
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={18} className="text-gray-300" />);
    }
    
    return stars;
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#28DF99]"></div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          {error || 'Product not found'}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#28DF99] hover:text-[#20c085] transition-colors"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back to products
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-[#28DF99] hover:text-[#20c085] transition-colors mb-6"
      >
        <ArrowLeft size={20} className="mr-1" />
        Back to products
      </button>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <ProductImageGallery images={product.images} name={product.name} />
          
          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="bg-[#99F3BD] text-[#28DF99] text-xs font-bold px-2 py-1 rounded-full uppercase">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-['Fira_Sans']">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(product.rating)}
              </div>
              <span className="text-gray-600 text-sm">
                ({product.numReviews} reviews)
              </span>
            </div>
            
            <div className="text-2xl font-bold text-[#28DF99] mb-4">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed font-['Fira_Sans']">
                {product.description}
              </p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <span className={`${product.stock > 0 ? 'text-green-600' : 'text-red-500'} font-semibold`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                
                {product.stock > 0 && (
                  <span className="text-gray-600 ml-2">
                    ({product.stock} available)
                  </span>
                )}
              </div>
            </div>
            
            {product.stock > 0 && (
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={product.stock}
                    className="w-16 text-center py-2 border-y border-gray-300 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                    className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-[#D2F6C5] text-[#28DF99] py-3 px-6 rounded-md hover:bg-[#c0e8b3] transition-colors font-['Fira_Sans'] font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
              
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 bg-[#28DF99] text-white py-3 px-6 rounded-md hover:bg-[#20c085] transition-colors font-['Fira_Sans'] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
            
            <div className="flex gap-4">
              <button className="flex items-center text-gray-600 hover:text-[#28DF99] transition-colors">
                <Heart size={20} className="mr-1" />
                Add to Wishlist
              </button>
              
              <button className="flex items-center text-gray-600 hover:text-[#28DF99] transition-colors">
                <Share2 size={20} className="mr-1" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Description */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4 font-['Fira_Sans']">
          Product Description
        </h2>
        
        <div className="prose max-w-none text-gray-700 font-['Fira_Sans']">
          <p>{product.description}</p>
          
          {/* Additional description content would go here */}
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
          </p>
          
          <ul className="mt-4 list-disc pl-5 space-y-2">
            <li>High-quality materials for durability</li>
            <li>Designed for comfort and style</li>
            <li>Easy to use and maintain</li>
            <li>Perfect for everyday use</li>
          </ul>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6 font-['Fira_Sans']">
            You May Also Like
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map(relatedProduct => (
              <div 
                key={relatedProduct._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={relatedProduct.images[0]} 
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-['Fira_Sans'] font-semibold text-gray-800 mb-1 truncate">
                    {relatedProduct.name}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {renderStars(relatedProduct.rating)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-['Fira_Sans'] font-bold text-[#28DF99]">
                      ${relatedProduct.price.toFixed(2)}
                    </span>
                    
                    <button
                      onClick={() => navigate(`/product/${relatedProduct._id}`)}
                      className="text-[#28DF99] hover:text-[#20c085] transition-colors font-['Fira_Sans'] font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductList from '../components/product/ProductList';
import ProductFilter from '../components/product/ProductFilter';
import { ShoppingBag, Truck, CreditCard, RotateCcw } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  rating: number;
  stock: number;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    category?: string;
    search?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
    page: number;
  }>({
    page: 1
  });
  
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  
  useEffect(() => {
    // Extract search params from URL
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    
    setFilters(prev => ({
      ...prev,
      category,
      search,
      page: 1 // Reset to page 1 when filters change
    }));
  }, [location.search]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Build query string
        const queryParams = new URLSearchParams();
        if (filters.category) queryParams.append('category', filters.category);
        if (filters.search) queryParams.append('search', filters.search);
        if (filters.sort) queryParams.append('sort', filters.sort);
        if (filters.minPrice !== undefined) queryParams.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice !== undefined) queryParams.append('maxPrice', filters.maxPrice.toString());
        queryParams.append('page', filters.page.toString());
        queryParams.append('limit', '8'); // 8 products per page
        
        const { data } = await axios.get(
          `/api/products?${queryParams.toString()}`,
          { withCredentials: true }
        );
        
        setProducts(data.products);
        setTotalPages(data.pages);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [filters]);
  
  const handleFilterChange = (newFilters: {
    category?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1 // Reset to page 1 when filters change
    }));
  };
  
  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
    
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 bg-[#99F3BD] rounded-xl overflow-hidden shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 font-['Fira_Sans']">
              Shop the Latest Trends
            </h1>
            <p className="text-lg text-gray-700 mb-6 font-['Fira_Sans']">
              Discover amazing products at unbeatable prices. Free shipping on orders over $50!
            </p>
            <a
              href="#products"
              className="bg-[#28DF99] text-white py-3 px-6 rounded-md hover:bg-[#20c085] transition-colors inline-block w-max font-['Fira_Sans'] font-semibold"
            >
              Shop Now
            </a>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Shopping"
              className="w-full h-64 md:h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-[#D2F6C5] p-3 rounded-full mr-4">
            <ShoppingBag size={24} className="text-[#28DF99]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1 font-['Fira_Sans']">Wide Selection</h3>
            <p className="text-sm text-gray-600">Thousands of products to choose from</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-[#D2F6C5] p-3 rounded-full mr-4">
            <Truck size={24} className="text-[#28DF99]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1 font-['Fira_Sans']">Fast Delivery</h3>
            <p className="text-sm text-gray-600">Quick and reliable shipping options</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-[#D2F6C5] p-3 rounded-full mr-4">
            <CreditCard size={24} className="text-[#28DF99]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1 font-['Fira_Sans']">Secure Payment</h3>
            <p className="text-sm text-gray-600">Multiple safe payment methods</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-[#D2F6C5] p-3 rounded-full mr-4">
            <RotateCcw size={24} className="text-[#28DF99]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1 font-['Fira_Sans']">Easy Returns</h3>
            <p className="text-sm text-gray-600">30-day hassle-free return policy</p>
          </div>
        </div>
      </section>
      
      {/* Products Section */}
      <section id="products" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Fira_Sans']">
          {filters.category 
            ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} Products` 
            : filters.search 
              ? `Search Results for "${filters.search}"` 
              : 'Our Products'}
        </h2>
        
        <ProductFilter 
          onFilterChange={handleFilterChange} 
          selectedCategory={filters.category}
        />
        
        {error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        ) : (
          <>
            <ProductList products={products} loading={loading} />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(filters.page - 1)}
                    disabled={filters.page === 1}
                    className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 rounded-md ${
                        filters.page === index + 1
                          ? 'bg-[#28DF99] text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={filters.page === totalPages}
                    className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-[#D2F6C5] rounded-xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-['Fira_Sans']">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-700 mb-6 font-['Fira_Sans']">
            Stay updated with our latest products and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#28DF99]"
              required
            />
            <button
              type="submit"
              className="bg-[#28DF99] text-white px-6 py-3 rounded-md hover:bg-[#20c085] transition-colors font-['Fira_Sans'] font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
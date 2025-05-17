import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface ProductFilterProps {
  onFilterChange: (filters: {
    category?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => void;
  selectedCategory?: string;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(selectedCategory || '');
  const [sort, setSort] = useState('');
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({});

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategory(value);
    onFilterChange({ category: value, sort, ...priceRange });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSort(value);
    onFilterChange({ category, sort: value, ...priceRange });
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value ? Number(value) : undefined;
    const newPriceRange = { ...priceRange, [type]: numValue };
    setPriceRange(newPriceRange);
    onFilterChange({ category, sort, ...newPriceRange });
  };

  const handleReset = () => {
    setCategory('');
    setSort('');
    setPriceRange({});
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer bg-[#D2F6C5]"
        onClick={toggleFilter}
      >
        <div className="flex items-center">
          <Filter size={20} className="mr-2 text-[#28DF99]" />
          <h3 className="font-['Fira_Sans'] font-semibold text-gray-800">Filter Products</h3>
        </div>
        {isOpen ? (
          <ChevronUp size={20} className="text-[#28DF99]" />
        ) : (
          <ChevronDown size={20} className="text-[#28DF99]" />
        )}
      </div>

      {isOpen && (
        <div className="p-4 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1 font-['Fira_Sans']">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={handleCategoryChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#28DF99] focus:border-[#28DF99]"
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Living</option>
                <option value="beauty">Beauty</option>
                <option value="sports">Sports</option>
                <option value="books">Books</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1 font-['Fira_Sans']">
                Sort By
              </label>
              <select
                id="sort"
                value={sort}
                onChange={handleSortChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#28DF99] focus:border-[#28DF99]"
              >
                <option value="">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-['Fira_Sans']">
                Price Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min || ''}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-[#28DF99] focus:border-[#28DF99]"
                  min="0"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max || ''}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-[#28DF99] focus:border-[#28DF99]"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-['Fira_Sans']"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;
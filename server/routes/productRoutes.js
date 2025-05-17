import express from 'express';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, search, sort, limit = 10, page = 1 } = req.query;
    const query = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    // Sorting options
    let sortOption = {};
    if (sort === 'price-asc') {
      sortOption = { price: 1 };
    } else if (sort === 'price-desc') {
      sortOption = { price: -1 };
    } else if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'rating') {
      sortOption = { rating: -1 };
    } else {
      sortOption = { createdAt: -1 }; // Default sort
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const products = await Product.find(query)
      .sort(sortOption)
      .limit(parseInt(limit))
      .skip(skip);
      
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      total
    });
  } catch (error) {
    console.error('Error fetching products:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      message: 'Failed to fetch products. Please try again later.',
      error: error.message 
    });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      message: 'Failed to fetch product. Please try again later.',
      error: error.message 
    });
  }
});

// Create a product (admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, description, price, images, category, stock } = req.body;
    
    const product = new Product({
      name,
      description,
      price,
      images,
      category,
      stock,
      user: req.user._id
    });
    
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    res.status(400).json({ 
      message: 'Failed to create product. Please check your input and try again.',
      error: error.message 
    });
  }
});

// Update a product (admin only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { name, description, price, images, category, stock } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.images = images || product.images;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    res.status(400).json({ 
      message: 'Failed to update product. Please check your input and try again.',
      error: error.message 
    });
  }
});

// Delete a product (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error('Error deleting product:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      message: 'Failed to delete product. Please try again later.',
      error: error.message 
    });
  }
});

export default router;
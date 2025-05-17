import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length >= 1;
      },
      message: 'Product must have at least one image'
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'clothing', 'Home', 'Beauty', 'Sports', 'Books'],
    set: v => v.toLowerCase()
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;

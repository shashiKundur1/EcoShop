import mongoose from 'mongoose';
import dotenv from 'dotenv';
import products from './data/products.js';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    
    // Create admin user
    const adminUser = await User.findOne({ email: 'admin@example.com' });
    let adminId;
    
    if (!adminUser) {
      const createdAdmin = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        isAdmin: true
      });
      adminId = createdAdmin._id;
    } else {
      adminId = adminUser._id;
    }
    
    // Add products
    await Product.insertMany(products);
    
    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete data
const destroyData = async () => {
  try {
    await Product.deleteMany();
    
    console.log('Data destroyed successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run script based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
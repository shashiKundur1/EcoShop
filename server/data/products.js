const products = [
  {
    name: "Wireless Noise Cancelling Headphones",
    description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for travel, work, or enjoying your favorite music without distractions.",
    price: 249.99,
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "electronics",
    stock: 25,
    rating: 4.8,
    numReviews: 127,
    featured: true
  },
  {
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, sleep tracking, and 7-day battery life. Water-resistant and compatible with iOS and Android.",
    price: 199.99,
    images: [
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "electronics",
    stock: 42,
    rating: 4.5,
    numReviews: 89,
    featured: true
  },
  {
    name: "Premium Cotton T-Shirt",
    description: "Ultra-soft 100% organic cotton t-shirt with a modern fit. Breathable, comfortable, and perfect for everyday wear. Available in multiple colors and sizes.",
    price: 29.99,
    images: [
      "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1566412/pexels-photo-1566412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "clothing",
    stock: 150,
    rating: 4.3,
    numReviews: 214,
    featured: false
  },
  {
    name: "Designer Denim Jacket",
    description: "Classic denim jacket with a modern twist. Features premium quality denim, stylish wash, and comfortable fit. Perfect for layering in any season.",
    price: 89.99,
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1124589/pexels-photo-1124589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "clothing",
    stock: 75,
    rating: 4.7,
    numReviews: 63,
    featured: true
  },
  {
    name: "Aromatherapy Essential Oil Diffuser",
    description: "Create a calming atmosphere with this stylish essential oil diffuser. Features 7 LED light colors, multiple mist settings, and auto shut-off. Perfect for bedroom, office, or living room.",
    price: 39.99,
    images: [
      "https://images.pexels.com/photos/4046718/pexels-photo-4046718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4046719/pexels-photo-4046719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4046720/pexels-photo-4046720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "home",
    stock: 68,
    rating: 4.4,
    numReviews: 142,
    featured: false
  },
  {
    name: "Luxury Scented Candle Set",
    description: "Set of 3 hand-poured soy wax candles with premium essential oil fragrances. Long-lasting burn time of 45+ hours per candle. Comes in elegant glass jars with wooden lids.",
    price: 49.99,
    images: [
      "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4195509/pexels-photo-4195509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4195499/pexels-photo-4195499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "home",
    stock: 54,
    rating: 4.9,
    numReviews: 78,
    featured: true
  },
  {
    name: "Professional Skincare Set",
    description: "Complete skincare routine featuring cleanser, toner, serum, moisturizer, and eye cream. Made with natural ingredients and suitable for all skin types. Cruelty-free and paraben-free.",
    price: 129.99,
    images: [
      "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3785170/pexels-photo-3785170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3785146/pexels-photo-3785146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "beauty",
    stock: 38,
    rating: 4.6,
    numReviews: 105,
    featured: true
  },
  {
    name: "Yoga Mat with Carrying Strap",
    description: "Premium non-slip yoga mat made from eco-friendly TPE material. Extra thick 6mm padding for joint protection. Includes carrying strap for easy transport.",
    price: 34.99,
    images: [
      "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4498604/pexels-photo-4498604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "sports",
    stock: 92,
    rating: 4.4,
    numReviews: 167,
    featured: false
  },
  {
    name: "Bestselling Fiction Novel",
    description: "The latest bestseller from acclaimed author. This page-turner combines suspense, emotion, and unforgettable characters. Hardcover edition with premium paper quality.",
    price: 24.99,
    images: [
      "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3747512/pexels-photo-3747512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3747508/pexels-photo-3747508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "books",
    stock: 120,
    rating: 4.8,
    numReviews: 231,
    featured: true
  },
  {
    name: "Wireless Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360° sound, 24-hour battery life, and waterproof design. Perfect for outdoor adventures, beach trips, or home use.",
    price: 79.99,
    images: [
      "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/191877/pexels-photo-191877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "electronics",
    stock: 65,
    rating: 4.5,
    numReviews: 183,
    featured: false
  }
];

export default products;
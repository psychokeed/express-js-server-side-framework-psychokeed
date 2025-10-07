const mongoose = require('mongoose');

// Define the schema for a Product
const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, { timestamps: true }); // adds createdAt and updatedAt fields automatically

// Export the model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const { v4: uuidv4 } = require("uuid");
const validateProduct = require("../middlewares/validateProducts");

// TODO: Implement the following routes:
// GET /api/products - Get all products
router.get('/', async (req, res) => {
    try {
        const product = await Product.find();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// GET /api/products/:id - Get a specific product
router.get('/:id', async (req, res) => {
    const product = await Product.findOne({ id: req.params.id });
    res.json(product);
    if (!product) {
        res.status(404).json({ message: 'Product not found!' });
    }
});

// GET /api/products?category=Electronics(filtering by category)
router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products?page=2&limit=5
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/search?name=phone
router.get('/search', async (req, res, next) => {
  try {
    const name = req.query.name || '';
    const products = await Product.find({ name: { $regex: name, $options: 'i' } });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/stats
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (err) {
    next(err);
  }
});


// POST /api/products - Create a new product
router.post('/', validateProduct, async (req, res) => {
    const { name, description, price, category, inStock } = req.body;

    try {
        const newProduct = new Product({
            id: uuidv4(),
            name,
            description,
            price,
            category,
            inStock
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/products/:id - Update a product
router.put('/:id', validateProduct, async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            {id: req.params.id},
            req.body,
            { new: true }
        );
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

})
// DELETE /api/products/:id - Delete a product
router.delete('/:id', async (req, res) => {
    try {
        await Product.findOneAndDelete({id: req.params.id});
        res.json({ message: 'Product deleted successfully!' });
    }
     catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router;
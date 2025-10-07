const validateProduct = (req, res, next) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ message: 'Missing required fields: name, price, category' });
  }

  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ message: 'Price must be a positive number' });
  }

  next();
};

module.exports = validateProduct;

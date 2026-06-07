import Product from '../models/Product.js';

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};


const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

const createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  const product = new Product({
    name: name || 'Sample Product',
    price: price || 0,
    seller: req.user._id,
    image: image || '/images/sample.jpg',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};


const updateProduct = async (req, res) => {
  const { name, price, image } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this product' });
    }
    product.name = name || product.name;
    product.price = price || product.price;
    product.image = image || product.image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};


const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this product' });
    }
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

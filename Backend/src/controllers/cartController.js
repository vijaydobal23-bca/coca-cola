import Cart from '../models/Cart.js';
import Product from '../models/Product.js';


const getCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  res.json(cart);
};


const addToCart = async (req, res) => {
  const { productId, qty } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

  if (existingItemIndex >= 0) {
    cart.items[existingItemIndex].qty += Number(qty) || 1;
  } else {
    cart.items.push({ product: productId, qty: Number(qty) || 1 });
  }

  await cart.save();
  res.status(200).json(cart);
};

const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
};

export { getCart, addToCart, removeFromCart };

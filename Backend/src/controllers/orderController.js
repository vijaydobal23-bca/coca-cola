import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import nodemailer from 'nodemailer';

// Configure Nodemailer (Use a test account or real SMTP for production)
const sendEmailNotification = async (email, orderId, deliveryTime) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail', // or any other service like smtp.ethereal.email for testing
      auth: {
        user: process.env.EMAIL_USER || 'test@gmail.com', // fallback required for smooth dev
        pass: process.env.EMAIL_PASS || 'password',
      },
    });

    const mailOptions = {
      from: '"Coke Store" <no-reply@cokedrinks.com>',
      to: email,
      subject: 'Your order is confirmed',
      text: `Thank you for your order! Your order ID is ${orderId}. Expected delivery time: ${deliveryTime}.`,
    };

    if (process.env.EMAIL_USER) {
      const info = await transporter.sendMail(mailOptions);
      console.log('Nodemailer: Email sent successfully! Message ID:', info.messageId);
    } else {
      console.log('Nodemailer: Email sent (Mocked due to missing credentials)', mailOptions);
    }
  } catch (error) {
    console.error(`Email sending failed with error:`, error);
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const {
    orderItems,
    selectedProductIds = [],
    address,
    phone,
    paymentMethod,
    totalAmount,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      address,
      phone,
      paymentMethod,
      totalAmount,
    });

    const createdOrder = await order.save();

    const selectedIdsFromBody = Array.isArray(selectedProductIds)
      ? selectedProductIds.map((id) => id?.toString()).filter(Boolean)
      : [];
    const selectedIdsFromOrder = orderItems
      .map((item) => item?.product?.toString())
      .filter(Boolean);
    const productIdsToClear = selectedIdsFromBody.length > 0 ? selectedIdsFromBody : selectedIdsFromOrder;

    // Clear only ordered items from cart (supports partial checkout).
    if (productIdsToClear.length > 0) {
      const idSet = new Set(productIdsToClear);
      const cart = await Cart.findOne({ user: req.user._id });
      if (cart) {
        cart.items = cart.items.filter((item) => !idSet.has(item.product.toString()));
        await cart.save();
      }
    }

    // Send email notification
    await sendEmailNotification(req.user.email, createdOrder._id, createdOrder.deliveryTime);

    res.status(201).json(createdOrder);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    // Only the user who placed the order (or a generic admin) can view it.
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'seller') {
      return res.status(401).json({ message: 'Not authorized to view this order' });
    }
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

// @desc    Update order to delivered (for sellers)
// @route   PUT /api/orders/:id/deliver
// @access  Private/Seller
const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = 'Delivered';
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

// @desc    Get all orders for sellers
// @route   GET /api/orders/all
// @access  Private/Seller
const getSellerOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name email');
  res.json(orders);
};

// @desc    Accept order and set delivery duration
// @route   PUT /api/orders/:id/accept
// @access  Private/Seller
const acceptOrder = async (req, res) => {
  const { deliveryTime } = req.body;
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    order.status = 'Accepted';
    if (deliveryTime) {
      order.deliveryTime = deliveryTime;
    }
    const updatedOrder = await order.save();

    // Send email notification about acceptance and delivery time
    await sendEmailNotification(order.user.email, updatedOrder._id, updatedOrder.deliveryTime);

    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

export { addOrderItems, getMyOrders, getOrderById, updateOrderToDelivered, getSellerOrders, acceptOrder };

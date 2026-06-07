import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  getSellerOrders,
  acceptOrder
} from '../controllers/orderController.js';
import { protect, seller } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/all').get(protect, seller, getSellerOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/deliver').put(protect, seller, updateOrderToDelivered);
router.route('/:id/accept').put(protect, seller, acceptOrder);

export default router;

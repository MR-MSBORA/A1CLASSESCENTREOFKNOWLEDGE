import express from 'express';
import { createOrder, verifyPayment, getMyPayments, getAllPayments } from '../../controllers/payment.controller.js';
import { protect }   from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';

const router = express.Router();
router.post('/create-order', protect, createOrder);
router.post('/verify',       protect, verifyPayment);
router.get('/my',            protect, getMyPayments);
router.get('/all',           protect, authorize('admin'), getAllPayments);
export default router;
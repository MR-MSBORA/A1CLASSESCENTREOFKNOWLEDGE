import express from 'express';
import {
  submitReview, getApprovedReviews,
  getPendingReviews, approveReview, deleteReview
} from '../../controllers/review.controller.js';
import { protect }   from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';

const router = express.Router();

router.get('/approved',       getApprovedReviews);
router.post('/',              protect, submitReview);
router.get('/pending',        protect, authorize('admin'), getPendingReviews);
router.patch('/:id/approve',  protect, authorize('admin'), approveReview);
router.delete('/:id',         protect, authorize('admin'), deleteReview);

export default router;
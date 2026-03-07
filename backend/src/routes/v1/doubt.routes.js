import express from 'express';
import { submitDoubt, getMyDoubts, getAllDoubts, replyToDoubt, resolveDoubt } from '../../controllers/doubt.controller.js';
import { protect }   from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';

const router = express.Router();
router.post('/',                  protect, submitDoubt);
router.get('/my',                 protect, getMyDoubts);
router.get('/',                   protect, authorize('admin','teacher'), getAllDoubts);
router.post('/:id/reply',         protect, authorize('admin','teacher'), replyToDoubt);
router.patch('/:id/resolve',      protect, authorize('admin','teacher'), resolveDoubt);
export default router;
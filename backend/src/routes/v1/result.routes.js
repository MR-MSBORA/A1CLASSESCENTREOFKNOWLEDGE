import express from 'express';
import { getResults, addResult, deleteResult } from '../../controllers/result.controller.js';
import { protect }    from '../../middleware/auth.middleware.js';
import { authorize }  from '../../middleware/role.middleware.js';
import { uploadImage } from '../../middleware/upload.middleware.js';

const router = express.Router();

router.get('/',       getResults);
router.post('/',      protect, authorize('admin'), uploadImage.single('photo'), addResult);
router.delete('/:id', protect, authorize('admin'), deleteResult);

export default router;
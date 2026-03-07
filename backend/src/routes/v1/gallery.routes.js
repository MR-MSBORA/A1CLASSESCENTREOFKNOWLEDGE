 
import express from 'express';
import { getGallery, uploadGalleryItem, deleteGalleryItem } from '../../controllers/gallery.controller.js';
import { protect }    from '../../middleware/auth.middleware.js';
import { authorize }  from '../../middleware/role.middleware.js';
import { uploadImage } from '../../middleware/upload.middleware.js';

const router = express.Router();

router.get('/',        getGallery);
router.post('/',       protect, authorize('admin','teacher'), uploadImage.single('file'), uploadGalleryItem);
router.delete('/:id',  protect, authorize('admin','teacher'), deleteGalleryItem);

export default router;
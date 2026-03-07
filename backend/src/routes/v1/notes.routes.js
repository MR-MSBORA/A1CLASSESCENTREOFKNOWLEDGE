import express from 'express';
import { getAllNotes, getNoteById, uploadNote, deleteNote, downloadNote } from '../../controllers/notes.controller.js';
import { protect }   from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { uploadPDF } from '../../middleware/upload.middleware.js';

const router = express.Router();
router.get('/',                getAllNotes);
router.get('/:id',             getNoteById);
router.post('/',               protect, authorize('admin','teacher'), uploadPDF.single('pdf'), uploadNote);
router.delete('/:id',          protect, authorize('admin'), deleteNote);
router.get('/download/:token', protect, downloadNote);
export default router;
// import express from 'express';
// import { getAllNotes, getNoteById, uploadNote, deleteNote, downloadNote } from '../../controllers/notes.controller.js';
// import { protect }   from '../../middleware/auth.middleware.js';
// import { authorize } from '../../middleware/role.middleware.js';
// import { uploadPDF } from '../../middleware/upload.middleware.js';

// const router = express.Router();
// router.get('/',                getAllNotes);
// router.get('/:id',             getNoteById);
// router.post('/',               protect, authorize('admin','teacher'), uploadPDF.single('pdf'), uploadNote);
// router.delete('/:id',          protect, authorize('admin'), deleteNote);
// router.get('/download/:token', protect, downloadNote);

// export default router;

import express from 'express';
import {
  getAllNotes,
  getNoteById,
  uploadNote,
  deleteNote,
  downloadNote,
} from '../../controllers/notes.controller.js';
import { protect }    from '../../middleware/auth.middleware.js';
import { authorize }  from '../../middleware/role.middleware.js';
import { uploadPDF }  from '../../middleware/upload.middleware.js';
import asyncHandler   from '../../utils/asyncHandler.js';
import ApiError       from '../../utils/ApiError.js';
import ApiResponse    from '../../utils/ApiResponse.js';
import Note           from '../../models/Note.model.js';
import User           from '../../models/User.model.js';
import Payment        from '../../models/Payment.model.js';

const router = express.Router();

// Public routes
router.get('/',    getAllNotes);
router.get('/:id', getNoteById);

// Upload / delete (admin / teacher)
router.post(
  '/',
  protect,
  authorize('admin', 'superadmin', 'teacher'),
  uploadPDF.single('pdf'),
  uploadNote,
);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteNote);

// Download via token
router.get('/download/:token', protect, downloadNote);

/* ─────────────────────────────────────────────────────────
   SECURE VIEW ENDPOINT
   GET /notes/:id/view
   - Free note       → always allowed
   - Enrolled student → always allowed
   - Others          → must have paid for this note
───────────────────────────────────────────────────────── */
router.get('/:id/view', protect, asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) throw new ApiError(404, 'Note not found');

  // Free note — anyone can access
  if (note.isFree) {
    return res.json(new ApiResponse(200, { url: note.fileUrl }, 'Access granted'));
  }

  // Enrolled student — full access to all notes
  const student = await User.findById(req.user._id);
  if (student?.isEnrolled) {
    return res.json(new ApiResponse(200, { url: note.fileUrl }, 'Access granted'));
  }

  // Check if student purchased this note individually
  const payment = await Payment.findOne({
    user:   req.user._id,
    note:   note._id,
    status: 'paid',
  });

  if (!payment) {
    throw new ApiError(403, 'Purchase this note to access it');
  }

  res.json(new ApiResponse(200, { url: note.fileUrl }, 'Access granted'));
}));

export default router;
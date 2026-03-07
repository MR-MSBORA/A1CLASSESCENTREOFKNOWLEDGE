import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'a1classes/notes',
    allowed_formats: ['pdf'],
    resource_type: 'raw',
  },
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'a1classes/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

export const uploadPDF   = multer({ storage: pdfStorage,   limits: { fileSize: 10 * 1024 * 1024 } });
export const uploadImage = multer({ storage: imageStorage, limits: { fileSize: 2  * 1024 * 1024 } });
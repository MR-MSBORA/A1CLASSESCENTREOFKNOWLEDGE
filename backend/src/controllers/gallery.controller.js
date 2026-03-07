import asyncHandler from '../utils/asyncHandler.js';
import ApiError     from '../utils/ApiError.js';
import ApiResponse  from '../utils/ApiResponse.js';
import Gallery      from '../models/Gallery.model.js';
import { cloudinary } from '../config/cloudinary.js';

export const getGallery = asyncHandler(async (req, res) => {
  const { branch } = req.query;
  const filter = branch ? { branch } : {};
  const items = await Gallery.find(filter).sort({ createdAt: -1 });
  res.json(new ApiResponse(200, items, 'Gallery fetched'));
});

export const uploadGalleryItem = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file uploaded');
  const { caption, branch, type } = req.body;
  const item = await Gallery.create({
    caption,
    branch:     branch || 'All',
    type:       type   || 'image',
    fileUrl:    req.file.path,
    publicId:   req.file.filename,
    uploadedBy: req.user._id,
  });
  res.status(201).json(new ApiResponse(201, item, 'Uploaded successfully'));
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) throw new ApiError(404, 'Item not found');
  if (item.publicId) {
    await cloudinary.uploader.destroy(item.publicId,
      { resource_type: item.type === 'video' ? 'video' : 'image' });
  }
  await Gallery.findByIdAndDelete(req.params.id);
  res.json(new ApiResponse(200, {}, 'Deleted successfully'));
});
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import config from '../config'
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    // folder: 'uploads', // folder in cloudinary
    // format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => file.originalname,
  },
})

export const parser = multer({ storage })

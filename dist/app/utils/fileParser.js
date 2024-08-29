"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const config_1 = __importDefault(require("../config"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        // folder: 'uploads', // folder in cloudinary
        // format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.originalname,
    },
});
exports.parser = (0, multer_1.default)({ storage });

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "chat_app_files", 
    allowedFormats: ["jpg", "png", "jpeg", "pdf", "docx", "txt"], // File formats
  },
});

const upload = multer({ storage });

export default upload;
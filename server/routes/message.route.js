import express from "express";
import { getMessage, sendMessage } from "../controller/message.controller.js";
import secureRoute from "../middleware/secureRoute.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

const router = express.Router();
router.post("/send/:id", secureRoute, upload.single('file'), sendMessage);
router.get("/get/:id", secureRoute, getMessage);

export default router;
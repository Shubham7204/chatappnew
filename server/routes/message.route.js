import express from "express";
import { getMessage, sendMessage } from "../controller/message.controller.js";
import secureRoute from "../middleware/secureRoute.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/send/:id", secureRoute, upload.single("file"), sendMessage); // Handle file upload
router.get("/get/:id", secureRoute, getMessage);

export default router;
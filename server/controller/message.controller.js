import Message from "../models/message.model.js";
import upload from "../config/multer.js";

export const sendMessage = async (req, res) => {
  try {
    let fileUrl = null;
    let fileType = null;

    if (req.file) {
      fileUrl = req.file.path;
      fileType = req.file.mimetype.startsWith("image/") ? "image" : "document";
    }

    const newMessage = new Message({
      senderId: req.user.id, // Assuming req.user is populated
      receiverId: req.params.id,
      message: req.body.message || "",
      fileUrl,
      fileType,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error });
  }
};

export const getMessage = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, receiverId: req.params.id },
        { senderId: req.params.id, receiverId: req.user.id },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve messages", error });
  }
};
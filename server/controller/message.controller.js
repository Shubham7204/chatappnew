import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import cloudinary from '../utils/cloudinary.js';

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const file = req.file;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let fileUrl = null;
    let fileType = null;

    // Handle file upload if present
    if (file) {
      // Convert the buffer to base64
      const fileStr = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      
      try {
        // Determine the resource type based on mimetype
        const resourceType = file.mimetype.startsWith('image/') ? 'image' : 'raw';
        
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
          resource_type: resourceType,
          // For PDFs and other files, specify the file extension
          format: file.mimetype === 'application/pdf' ? 'pdf' : undefined,
          // Add these options for better handling of documents
          flags: 'attachment',
          use_filename: true,
          unique_filename: true,
        });

        fileUrl = uploadResponse.secure_url;
        // Set fileType based on mimetype
        if (file.mimetype.startsWith('image/')) {
          fileType = 'image';
        } else if (file.mimetype === 'application/pdf') {
          fileType = 'pdf';
        } else {
          fileType = 'file';
        }

      } catch (error) {
        console.log("Error uploading to cloudinary:", error);
        return res.status(500).json({ error: "Error uploading file" });
      }
    }

    // Validate that either message or file is present
    if (!message && !fileUrl) {
      return res.status(400).json({ error: "Either message or file is required" });
    }

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message: message || "",
      fileUrl,
      fileType
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id;
    
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");
    
    if (!conversation) {
      return res.status(201).json([]);
    }
    
    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
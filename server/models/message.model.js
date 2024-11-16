import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
    },
    fileUrl: {
      type: String, // URL for the uploaded file
    },
    fileType: {
      type: String, // Type of file (e.g., "image", "document")
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", messageSchema);

export default Message;
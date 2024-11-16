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
      required: function() {
        // Message is required only if there's no file
        return !this.fileUrl;
      }
    },
    fileUrl: {
      type: String,
      default: null
    },
    fileType: {
      type: String,
      enum: ['image', 'pdf', 'file', null],
      default: null
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("message", messageSchema);
export default Message;


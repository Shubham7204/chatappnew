import React, { useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  const sendMessages = async (message, file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("message", message);
      
      if (file) {
        formData.append("file", file);
      }

      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage([...messages, res.data]);
    } catch (error) {
      console.log("Error in sending message:", error);
      // You might want to show an error toast here
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
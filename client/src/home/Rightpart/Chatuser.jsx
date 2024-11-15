import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className="bg-white p-4 flex items-center space-x-4 shadow-md">
      <div>
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-medium text-gray-600">
          {selectedConversation?.fullname?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>
      <div>
        <h1 className="text-lg font-semibold text-gray-800">
          {selectedConversation?.fullname || "No User Selected"}
        </h1>
        <span className="text-sm text-gray-500">
          {selectedConversation?._id
            ? getOnlineUsersStatus(selectedConversation._id)
            : "Unknown"}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;
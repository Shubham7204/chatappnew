import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`px-4 py-2 cursor-pointer transition-colors ${
        isSelected ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt={user.fullname}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-xl text-gray-600">
                {user.fullname?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{user.fullname}</h3>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default User;
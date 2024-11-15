import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const chatName = itsMe ? "justify-end" : "justify-start";
  const chatColor = itsMe ? "bg-purple-600 text-white" : "bg-purple-200 text-black";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`p-4 ${chatName}`}>
      <div className={`rounded-lg p-3 ${chatColor}`}>
        {message.message}
        <div className="text-sm text-gray-400 mt-1">{formattedTime}</div>
      </div>
    </div>
  );
}

export default Message;
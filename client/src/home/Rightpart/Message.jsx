import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  // Styling classes for sent (right) and received (left) messages
  const containerClass = itsMe ? "justify-end" : "justify-start";
  const bubbleClass = itsMe
    ? "bg-green-500 text-white"
    : "bg-gray-200 text-black";
  const marginClass = itsMe ? "ml-auto mr-2" : "mr-auto ml-2";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const renderFileContent = () => {
    if (!message.fileUrl) return null;

    if (message.fileType === "image") {
      return (
        <img
          src={message.fileUrl}
          alt="Shared image"
          className="max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => window.open(message.fileUrl, "_blank")}
        />
      );
    } else {
      return (
        <a
          href={message.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <span className="text-blue-600 underline">Download File</span>
        </a>
      );
    }
  };

  return (
    <div
      className={`flex ${containerClass} mb-2`}
    >
      <div
        className={`rounded-lg p-3 ${bubbleClass} max-w-[75%] ${marginClass}`}
      >
        {message.message && <div className="mb-2">{message.message}</div>}

        {renderFileContent()}

        <div className="text-sm opacity-70 mt-1 text-right">{formattedTime}</div>
      </div>
    </div>
  );
}

export default Message;
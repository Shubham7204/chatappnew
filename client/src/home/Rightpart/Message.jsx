import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

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

  const handleFileDownload = async (url, fileName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

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
        <div
          onClick={() => handleFileDownload(message.fileUrl, message.fileName)}
          className="flex items-center space-x-2 bg-[#2c2c2c67] py-2 px-3 rounded-lg transition-colors cursor-pointer hover:bg-[#2c2c2c90]"
        >
          <svg
            className="w-6 h-6 text-white"
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
          <span className="text-white">{message.fileName}</span>
        </div>
      );
    }
  };

  return (
    <div className={`flex ${containerClass} mb-2`}>
      <div className={`rounded-lg p-3 ${bubbleClass} max-w-[75%] ${marginClass}`}>
        {message.message && <div className="mb-2">{message.message}</div>}

        {renderFileContent()}

        <div className="flex gap-2 items-center mt-1 justify-between px-1">
          {message.fileType === "pdf" && (
            <p className="text-start text-[12px]">File-Type : PDF</p>
          )}
          <div className="text-sm opacity-70 text-right">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;
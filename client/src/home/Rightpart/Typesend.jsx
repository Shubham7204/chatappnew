import React, { useState, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import useSendMessage from "../../hooks/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const { loading, sendMessages } = useSendMessage();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() || selectedFile) {
      await sendMessages(message, selectedFile);
      setMessage("");
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4">
      {/* File Preview Section */}
      {selectedFile && (
        <div className="mb-2 relative">
          {previewUrl ? (
            <div className="relative inline-block">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-32 rounded-lg"
              />
              <button
                type="button"
                onClick={removeFile}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="relative inline-block bg-gray-100 p-2 rounded-lg">
              <span className="pr-6">{selectedFile.name}</span>
              <button
                type="button"
                onClick={removeFile}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex space-x-2 items-center">
        <button 
          type="button" 
          onClick={handleAttachClick}
          className="text-gray-500 hover:text-gray-700"
        >
          <IoMdAttach className="text-2xl" />
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
        />

        <input
          type="text"
          placeholder="Type here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-[1px] border-gray-300 flex items-center w-full py-2 px-3 rounded-xl grow outline-none"
        />
        
        <button 
          type="submit" 
          disabled={loading || (!message.trim() && !selectedFile)}
          className="text-purple-600 hover:text-purple-700 disabled:text-gray-400"
        >
          <IoSend className="text-3xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
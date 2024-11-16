import React from "react";

function Loading() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen">
      <h1 className="text-center text-[25px]">Hold tight, chats are being loaded...</h1>
      <div className="animate-spin mx-auto rounded-full h-14 w-14 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default Loading;
import React from "react";
import Search from "./Search";
import Users from "./Users";

function Left() {
  return (
    <div className="w-full md:w-[30%] bg-white border-r">
      <h1 className="font-bold text-2xl p-4 text-gray-800">Messages</h1>
      <Search />
      <div className="flex-1 overflow-y-auto" style={{ height: "calc(100vh - 180px)" }}>
        <Users />
      </div>
    </div>
  );
}

export default Left;
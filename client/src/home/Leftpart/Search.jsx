import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../statemanage/useConversation";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find(
      (user) =>
        user.fullname?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
              <FaSearch className="text-gray-400 hover:text-gray-600 w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Search;
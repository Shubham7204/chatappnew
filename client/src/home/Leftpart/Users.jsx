import React from "react";
import User from "./User";
import useGetAllUsers from "../../hooks/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {allUsers.length === 0 ? (
        <p className="text-center text-gray-500 py-4">No users found</p>
      ) : (
        allUsers.map((user, index) => (
          <User 
            key={user._id || index} 
            user={user} 
          />
        ))
      )}
    </div>
  );
}

export default Users;
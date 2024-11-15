import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };
  return (
    <nav className="w-full bg-gray-100 text-black flex justify-between items-center p-2 shadow-md">
      <h1 className="text-2xl font-bold ml-4">ChatApp</h1>
      <button>
        <TbLogout2
          className="text-5xl p-2 hover:bg-gray-100 rounded-lg duration-300"
          onClick={handleLogout}
        />
      </button>
    </nav>
  );
}

export default Logout;
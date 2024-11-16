import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../statemanage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full bg-white">
      <div className="h-screen flex flex-col">
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <Chatuser />
            <div className="flex-1 overflow-y-auto min-h-0">
              <Messages />
            </div>
            {/* Adjusting Typesend with a margin to lift it from the bottom */}
            <div className="border-t p-2"> {/* Added mb-4 here */}
              <Typesend />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5 top-5 z-10"
      >
        <CiMenuFries className="text-black text-xl" />
      </label>
      <h1 className="text-center text-xl">
        Welcome{" "}
        <span className="font-semibold underline text-xl">{authUser.user.fullname}</span>
        <br />
        No chat selected, please start conversation by selecting anyone to your
        contacts
      </h1>
    </div>
  );
};

import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";
import useConversation from "../../statemanage/useConversation.js";

function Messages() {
  const { loading, messages } = useGetMessage();
  const { messages: conversationMessages } = useConversation();
  useGetSocketMessage();

  const lastMsgRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [conversationMessages]);

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {loading ? (
        <Loading />
      ) : (
        conversationMessages.length > 0 &&
        conversationMessages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <Message message={message} />
          </div>
        ))
      )}

      {!loading && conversationMessages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p>Say! Hi to start the conversation</p>
        </div>
      )}
    </div>
  );
}

export default Messages;
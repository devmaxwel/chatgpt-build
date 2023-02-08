import React from "react";
import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";

type Props = {
  params: {
    id: string;
  };
};

const ChatPage = ({ params: { id } }: Props) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Chat */}
      <Chat id={id} />
      {/* Message Input */}
      <div className="px-2 pb-2">
        <ChatInput id={id} />
      </div>
    </div>
  );
};

export default ChatPage;

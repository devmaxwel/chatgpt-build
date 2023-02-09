import { DocumentData } from "firebase/firestore";
import React from "react";

type Props = {
  message: DocumentData;
};

const Message = ({ message }: Props) => {
  const isChatGpt = message.user._id === "ChatGPT";
  return (
    <div className={`py-5 text-white px-2 ${isChatGpt && "bg-[#434654]"}`}>
      <div className="flex space-x-5 max-w-2xl mx-auto">
        <img
          src={message.user.avatar}
          alt="user-profile"
          className="h-8 w-8 rounded-md"
        />
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;

"use client";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";
type Props = {
  id: string;
};
const Chat = ({ id }: Props) => {
  const { data: session } = useSession();
  const [messages] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats", id, "messages"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex-1">
      {messages?.docs.map((doc) => (
        <Message key={doc.id} message={doc.data()} />
      ))}
    </div>
  );
};

export default Chat;

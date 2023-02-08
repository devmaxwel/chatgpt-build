"use client";
import { useSession } from "next-auth/react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";

const SideBar = () => {
  const { data: session } = useSession();
  const [chats, laoding, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );
  return (
    <div className="h-screen p-2 flex flex-col">
      <div className="flex-1">
        <div>
          {/* New Chat */}
          <NewChat />
          <div>{/* ModelSelection */}</div>
          {/* Map Through the Chat Rows */}
          <div className="pt-5">
            {chats?.docs.map((doc) => (
              <ChatRow key={doc.id} id={doc.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        <img
          src={session.user?.image!}
          alt="user"
          className="h-12 w-12 rounded-full mx-auto mb-2 hover:opacity-50 cursor-pointer"
        />
      )}
    </div>
  );
};

export default SideBar;

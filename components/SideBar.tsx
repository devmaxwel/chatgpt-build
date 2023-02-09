"use client";
import { useSession } from "next-auth/react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

const SideBar = () => {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
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
          {/* Model Selection */}
          <div className="hidden sm:inline">
            <ModelSelection />
          </div>
          {/* Map Through the Chat Rows */}
          <div className="flex flex-col space-y-3 mt-5">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}
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

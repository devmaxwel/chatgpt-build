"use client";
import { PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { db } from "../firebase";

const NewChat = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const createChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );
    router.push(`/chat/${doc.id}`);
  };
  return (
    <div
      onClick={() => createChat()}
      className="border border-gray-700 chatRow"
    >
      <PlusIcon className="h-4 w-4 text-white" />
      <p>New Chat</p>
    </div>
  );
};

export default NewChat;

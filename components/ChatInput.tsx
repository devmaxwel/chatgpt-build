"use client";
import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import useSWR from "swr";
import { toast } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
type Props = {
  id: string;
};
const ChatInput = ({ id }: Props) => {
  const { data: session } = useSession();

  //   Use useSWR to fetch data from an API endpoint
  const { data: model } = useSWR("/model", {
    fallbackData: "text-davinci-003",
  });

  const [prompt, setPrompt] = useState("");
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      },
    };

    await addDoc(
      collection(db, "users", session?.user?.email!, "chats", id, "messages"),
      message
    );

    // Toast to say loading
    const notification = toast.loading("ChatGPT3 is thinking...");

    // Api Method
    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        id,
        model,
        session,
      }),
    })
      .then((res) => {
        if (res)
          toast.success("ChatGPT3 has responded!", {
            id: notification,
          });
        // Toast Success
      })
      .catch((err) => {
        toast.error("ChatGPT3 has failed to respond!", {
          id: notification,
        });
        // Toast Error
      });
  };
  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form
        onSubmit={(e) => handleSubmission(e)}
        className="p-5 space-x-5 flex"
      >
        <input
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          type="text"
          value={prompt}
          disabled={!session}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message here......"
        />
        <button
          type="submit"
          disabled={!prompt || !session}
          className="bg-[#11A37F] hover:opacity-50 text-white rounded px-4 py-2 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <PaperAirplaneIcon className="h-5 w-5  hover:text-blue-700 -rotate-45" />
        </button>
      </form>
      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
};

export default ChatInput;

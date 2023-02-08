// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/queryApi";
import admin from "firebase-admin";
import { adminDB } from "../../firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, id, model, session } = req.body;
  if (!prompt || !id || !model || !session) {
    res.status(400).json({ answer: "Bad Request" });
  }
  const response = await query(prompt, id, model);
  const message: Message = {
    text:
      response ||
      "ChatGPT3 was unable to respond to your question. Please try again later.",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://links.papareact.com/89k",
    },
  };
  await adminDB
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(id)
    .collection("messages")
    .add(message);
  res.status(200).json({ answer: message.text });
}

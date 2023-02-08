"use client";

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";

type Pops = {
  children: React.ReactNode;
  session: Session | null;
};

export default function SessionProvider({ children, session }: Pops) {
  return <Provider>{children}</Provider>;
}

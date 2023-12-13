"use client";
import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";

function NextAuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthProvider;

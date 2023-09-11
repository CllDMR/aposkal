"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export function Providers(props: {
  children: React.ReactNode;
  session?: Session | null | undefined;
}) {
  return (
    <SessionProvider session={props.session}>{props.children}</SessionProvider>
  );
}

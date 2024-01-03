"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }) => {
  return (
    <SessionProvider session={null} refetchInterval={60 * 60 * 24}>
      {children}
    </SessionProvider>
  );
};

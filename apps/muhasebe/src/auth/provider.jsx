"use client";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => {
  return (
    <SessionProvider session={null} refetchInterval={60 * 60 * 24}>
      {children}
    </SessionProvider>
  );
};

export default AuthProvider;

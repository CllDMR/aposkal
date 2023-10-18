import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import { authOptions, getServerSession } from "@acme/auth";

import { Providers } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Account Manager",
  description: "Simple account management tool.",
};

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <Providers session={session}>{props.children}</Providers>
      </body>
    </html>
  );
}

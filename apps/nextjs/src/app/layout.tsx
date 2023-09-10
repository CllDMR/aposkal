import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import { headers } from "next/headers";
import { getServerSession } from "next-auth";

import { authOptions } from "@acme/auth";

import { Providers } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Stock Manager",
  description: "Simple stock management tool.",
};

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No session");

  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <Providers headers={headers()} session={session}>
          {props.children}
        </Providers>
      </body>
    </html>
  );
}

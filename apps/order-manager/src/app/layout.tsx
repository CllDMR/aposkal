import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import { headers } from "next/headers";

import { auth } from "@acme/auth";

import { Providers } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Order Manager",
  description: "Simple order management tool.",
};

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <div>
          <Providers headers={headers()} session={session}>
            {props.children}
          </Providers>
        </div>
      </body>
    </html>
  );
}

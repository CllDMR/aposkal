import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";

import "~/styles/globals.css";

import { headers } from "next/headers";

import { auth } from "@acme/auth";

import { Providers } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Muhasebe",
  description: "Simple muhasebe tool.",
};

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={[
          "scroll-smooth font-sans antialiased",
          fontSans.variable,
          inter.variable,
          lexend.variable,
        ].join(" ")}
      >
        <div>
          <Providers headers={headers()} session={session}>
            {props.children}
          </Providers>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import { headers } from "next/headers";

import { Providers } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Stock Manager",
  description: "Simple stock management tool.",
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <Providers headers={headers()}>{props.children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import { Providers } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Account Manager",
  description: "Simple account management tool.",
};

export default function Layout(props: { children: React.ReactNode }) {
  // const pathname = usePathname();
  // let session = null;
  // if (!pathname.startsWith("/auth/login")) session = await auth();

  return (
    <html lang="en">
      <body
        className={[
          "scroll-smooth font-sans antialiased ",
          fontSans.variable,
        ].join(" ")}
      >
        <div>
          <Providers
          // session={session}
          >
            {props.children}
          </Providers>
        </div>
      </body>
    </html>
  );
}

import { Inter, Lexend } from "next/font/google";
import { headers } from "next/headers";
import { Providers } from "@/components/providers";

import { auth } from "@acme/auth";

import "../tailwind.css";

export const metadata = {
  title: {
    template: "%s - TaxPal",
    default: "Aposkal | Muhasebe Programı",
  },
  description: "Aposkal, muhasebe programı,",
};

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

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={[
          "h-full scroll-smooth bg-white antialiased",
          inter.variable,
          lexend.variable,
        ].join(" ")}
      >
        <div>
          <Providers headers={headers()} session={session}>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}

/* <html
      lang="en"
      className={clsx(
        "h-full scroll-smooth bg-white antialiased",
        inter.variable,
        lexend.variable,
      )}
    >
      <body>
        <Providers>
          <main className="flex flex-col h-full"> {children}</main>
        </Providers>
      </body>
    </html> */

import { Inter, Lexend } from "next/font/google";
import { Providers } from "@/components/providers";
import clsx from "clsx";

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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={clsx(
        "h-full scroll-smooth bg-white antialiased",
        inter.variable,
        lexend.variable,
      )}
    >
      <body>
        <Providers>
          <main className="flex h-full flex-col"> {children}</main>
        </Providers>
      </body>
    </html>
  );
}

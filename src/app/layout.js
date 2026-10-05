import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import Providers from "./providers";
import SiteChrome from "@/components/layout/SiteChrome";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "ooShirts — Custom T-Shirts & Apparel Printing",
  description:
    "Design and order custom T-shirts, hoodies and team apparel. Premium print quality, low price guarantee, free shipping and a free design review on every order.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${display.variable}`}>
      <body>
        {/* <Providers> */}
        <SiteChrome>{children}</SiteChrome>
        {/* </Providers> */}
      </body>
    </html>
  );
}

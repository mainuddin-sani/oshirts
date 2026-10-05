"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

/**
 * The design studio is a full-screen app, not a marketing page — it hides
 * the site header/footer the same way the real ooShirts design app has no
 * site chrome around it.
 */
export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isDesignApp = pathname?.includes("/design");

  return (
    <>
      {!isDesignApp ? <Header /> : null}
      <main id="main">{children}</main>
      {!isDesignApp ? <Footer /> : null}
    </>
  );
}

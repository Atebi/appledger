"use client";

import "./globals.css";
import { Quicksand } from "next/font/google";
import useDarkMode from "./utils/useDarkMode";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [colorTheme, setTheme] = useDarkMode();
  return (
    <html className={colorTheme} lang="en">
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}

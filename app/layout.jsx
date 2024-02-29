// "use client";

import "./globals.css";
import { Quicksand } from "next/font/google";
// import useDarkMode from "./utils/useDarkMode";
import { Providers } from "./components/Providers";
import AOSInit from "./utils/aos";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  // const [colorTheme, setTheme] = useDarkMode();
  // className={colorTheme}
  return (
    <html lang="en" suppressHydrationWarning>
      <AOSInit />
      <body className={quicksand.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

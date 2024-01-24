"use client";

import React from "react";
import getApps from "@/app/utils/localStorage";
import useDarkMode from "../../utils/useDarkMode";
import { IoSunnySharp, IoMoonSharp } from "react-icons/io5";

// This is for the home page
// I Commented out elements instead of deleting them so that one could possibly merge all 4 navbar components into 1.

const BarTwo = () => {
  // to toggle between light and dark mode.
  const [colorTheme, setTheme] = useDarkMode();

  // bring in all entries so that we can update its total at the top of the navbar
  const [_, totalEntries] = getApps();
  // console.log("total For nav :", totalEntries);
  // console.log("For nav :", _);

  return (
    <nav className="fixed right-0 top-0 mb-14 flex w-full justify-between border-b-2 border-gray-400/20 bg-white/30 px-4 py-1 backdrop-blur-md dark:border-gray-400/10 dark:bg-transparent md:px-10 lg:mb-20 lg:px-24">
      <div className="flex w-32 place-items-center gap-4">
        {/* <span className="h-9 text-slate-500 self-end">All</span> */}
        {/* <Link href="/search" className="">
          <span>
            <IoSearchSharp className="w-5 h-5 fill-blue-500" />
          </span>
        </Link> */}
        <div className="flex justify-start gap-2">
          <h1 className="border-l-2 border-blue-500 pl-2.5 pt-1 text-2xl font-medium text-gray-700/90 dark:text-gray-300/40">
            Apps
          </h1>
          <span className="text-xs font-medium text-blue-500">
            {totalEntries}
          </span>
        </div>
      </div>

      <p className="invisible w-32 text-center text-xs leading-9 text-gray-400 dark:text-gray-300/40 md:visible">
        Appledger
      </p>

      <div className="flex w-32 justify-end">
        {/* toggle light and dark mode. */}
        <span className="self-center">
          {colorTheme === "light" ? (
            <IoSunnySharp
              onClick={() => setTheme("light")}
              className="h-5 w-5 fill-stone-100"
            />
          ) : (
            <IoMoonSharp
              onClick={() => setTheme("dark")}
              className="h-5 w-5 fill-stone-950"
            />
          )}
        </span>
      </div>
    </nav>
  );
};

export default BarTwo;

import React from "react";
import Link from "next/link";
import { IoMoonSharp } from "react-icons/io5";

// This is for the login page.
// I Commented out elements instead of deleting them so that one could possibly merge all 4 navbar components into 1.

const BarOne = () => {
  return (
    <nav className="mb-14 flex w-full justify-between border-b-2 border-gray-400/20 bg-white/50 px-4 py-1 dark:border-gray-400/10 dark:bg-transparent md:px-10 lg:px-24">
      <div className="flex w-32 place-items-center gap-4">
        {/* <span className="hidden text-slate-500">All</span> */}
        {/* <Link href="/search">
          <span>
            <IoSearchSharp className="w-5 h-5 fill-blue-500" />
          </span>
        </Link> */}
        <div className="flex justify-start gap-2">
          <h1 className="border-l-2 border-blue-500 pl-2.5 pt-1 text-2xl font-medium text-gray-700/90 dark:text-gray-300/40">
            Welcome
          </h1>
          {/* <span className="collapse text-sm text-orange-500">8</span> */}
        </div>
      </div>

      <p className="invisible w-32 text-center text-xs font-medium leading-9 text-gray-700/50 dark:text-gray-300/40 md:visible">
        Appledger
      </p>

      <div className="collapse flex w-32 justify-end">
        <Link href="/search" className="self-center">
          <span>
            <IoMoonSharp className="h-5 w-5 fill-gray-500" />
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default BarOne;

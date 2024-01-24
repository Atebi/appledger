"use client";

import React from "react";
import Menu from "../modal/Menu";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";

// This is for the view-entry page
// I Commented out elements instead of deleting them so that one could possibly merge all 4 navbar components into 1.

const BarThree = ({ title, id }) => {
  // console.log("bar3 title :", title);
  // console.log("bar3 id :", id);

  const router = useRouter();

  return (
    <nav className="fixed right-0 top-0 mb-14 flex w-full justify-between border-b-2 border-gray-400/20 bg-white/50 px-4 py-1 backdrop-blur-md dark:border-gray-400/10 dark:bg-transparent md:px-10 lg:px-24">
      <div className="flex w-32 place-items-center gap-4">
        {/* <span className="hidden text-slate-500">All</span> */}
        <span>
          <BiArrowBack
            onClick={() => router.back()}
            className="m-1 h-5 w-5 cursor-default rounded-full fill-gray-800 hover:bg-gray-300 active:bg-gray-400 dark:fill-white dark:hover:fill-gray-800"
          />
        </span>
        <div className="flex justify-start gap-2">
          <h1 className="border-l-2 border-blue-500 pl-2.5 pt-1 text-2xl font-medium capitalize text-gray-700/90 dark:text-gray-300/40">
            {title}
          </h1>
          {/* <span className="collapse text-sm text-orange-500">8</span> */}
        </div>
      </div>

      <p className="invisible w-32 text-center text-xs font-medium leading-9 text-gray-700/50 dark:text-gray-300/40 md:visible">
        Appledger
      </p>

      <div className="relative flex w-32 justify-end">
        {/* passed title and id to menu component */}
        <Menu nav={true} entryID={id} entryTitle={title} />
        {/* <Link href="/edit" className="self-center">
          <span>
            <BiDotsVertical className="w-5 h-5 fill-slate-500" />
          </span>
        </Link> */}
      </div>
    </nav>
  );
};

export default BarThree;

"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import Button from "../Button";
import Modal from "../modal/Modal";

// This is for the edit and add-new-entry pages.
// I Commented out elements instead of deleting them so that one could possibly merge all 4 navbar components into 1.

const BarFour = ({ title_text }) => {
  const router = useRouter();
  // all to show modal component
  const searchParams = useSearchParams();
  const showModal = searchParams.get("modal");
  // console.log(showModal);
  const pathname = usePathname();
  const href = pathname + "/?modal=true";

  return (
    <nav className="fixed right-0 top-0 mb-14 flex w-full justify-between border-b-2 border-gray-400/20 bg-white/50 px-4 py-1 backdrop-blur-md dark:border-gray-400/10 dark:bg-transparent md:px-10 lg:px-24">
      <div className="flex w-32 place-items-center gap-4">
        {/* <span className="hidden text-slate-500">All</span> */}

        <span>
          <BiArrowBack
            onClick={() => router.back()}
            className="m-1 h-5 w-5 cursor-default rounded-full fill-gray-800  hover:bg-gray-300 active:bg-gray-400 dark:fill-white dark:hover:fill-gray-800"
          />
        </span>
        <div className="flex justify-start gap-2">
          <h1 className="border-l-2 border-blue-500 pl-2.5 pt-1 text-2xl font-medium text-gray-700/90 dark:text-gray-300/40">
            {title_text}
          </h1>
          {/* <span className="collapse text-sm text-orange-500">8</span> */}
        </div>
      </div>

      <p className="invisible w-32 text-center text-xs leading-9 text-gray-400 dark:text-gray-300/40 md:visible">
        Appledger
      </p>

      <div className="flex w-32 items-center justify-end">
        <Link href={href}>
          <Button type="default" text="+ Field" />
        </Link>
      </div>
      {showModal && <Modal />}
    </nav>
  );
};

export default BarFour;

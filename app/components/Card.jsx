"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Menu from "./modal/Menu";
import { Marker } from "react-mark.js"; // for text-highlighting

const Card = ({ title, descr, tag, id, highlight }) => {
  // console.log(descr.length);

  const [active, setActive] = useState(false); // to set a blue outline when onClick
  const router = useRouter();

  // if "isSearching", get the search query
  const query = highlight ? localStorage.getItem("appQuery") : "";

  // const text =
  //   "A lot of body textingA lot of use body textingA lot of body textingA lot of body textingA lot of body textingA lot of body texting";
  // const truncate = (text) => text.substring(0, 60) + "...";

  // truncate description string
  const truncatedText =
    descr.length > 60 ? descr.substring(0, 60) + "..." : descr;

  // set onClick border color
  const borderColour = active ? "border-blue-500" : "border-gray-400/20";
  const borderColourDark = active ? "border-blue-500" : "border-gray-400/10";

  // user clicks card
  const handleClick = async () => {
    setActive(true); // show blue-outline
    await new Promise((resolve) => setTimeout(resolve, 3000)); // wait func

    //get cardTitle in titleCase
    const titled = title.split(" ").reduce((all, value, index) => {
      all += value;
      if (index === 0) {
        value.toUpperCase();
      }
      return all;
    });
    const href = `/view-entry/${titled}/${id}`;
    router.push(href);
  };
  //

  return (
    <>
      <div
        className={`grid h-36 w-full grid-cols-12 rounded-lg border-2 bg-white/30 p-4 pr-0.5 pt-1 ${borderColour} cursor-default hover:border-gray-400/40 hover:bg-white/40 dark:bg-transparent dark:${borderColourDark} dark:hover:border-gray-400/20`}
      >
        <div
          onClick={handleClick}
          className="overflowWrap col-span-10 grid content-end gap-2"
        >
          <h2 className="text-2xl font-bold capitalize text-gray-700 dark:text-gray-300/70">
            {/* "Marker" helps with text highligting when user is searching. it is used "as span" else it causes an error-"<div></div> can't be a descendant of <p></p>" */}
            <Marker as={"span"} mark={query}>
              {title}
            </Marker>
          </h2>
          <div className="flex flex-col gap-1.5">
            <p className="h-10 w-full text-sm font-medium text-gray-700/70 dark:text-gray-300/40">
              <Marker as={"span"} mark={query}>
                {truncatedText}
              </Marker>
            </p>
            <p className="text-sm font-medium capitalize text-blue-500">
              <Marker as={"span"} mark={query}>
                #{tag}
              </Marker>
            </p>
          </div>
        </div>

        <div
          // onClick={(e) => e.stopPropagation()}
          className="relative col-start-11 col-end-13 justify-self-center"
        >
          {/* title and id are passed to the menu so that the menu can handle edit and delete functions. */}
          <Menu entryTitle={title} entryID={id} />
        </div>
      </div>
    </>
  );
};

export default Card;

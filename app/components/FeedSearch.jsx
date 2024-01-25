"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Feed from "./Feed";
import getApps from "../utils/localStorage";
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";

const FeedSearch = () => {
  const [entries, setEntries] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // true when user starts searching

  // load apps from local storage on first render
  const [allApps, totalEntries] = getApps();
  // console.log("all appsons", allApps);

  useEffect(() => {
    // console.log("useeffect appsons", allApps);

    //if user hasnt started searching, setEntries to apps loaded from localStorage for render
    if (!isSearching) {
      setEntries(allApps);
    }
    // console.log("useeffect apps: ", entries);
  }, [entries]);
  // console.log("entries to feed :", entries);

  return (
    <>
      {/*I passed setEntries and isSearching and entries so that the cards will re-render upon user search.*/}
      <SearchBar setEntries={setEntries} setIsSearching={setIsSearching} />
      {totalEntries >= 1 ? (
        <>
          <Feed isSearching={isSearching} entries={entries} />
        </>
      ) : (
        <div className="mt-24 grid place-items-center gap-4">
          <div className="relative h-24 w-24 opacity-75">
            <Image
              src="/appledger/noteIllus.svg"
              fill={true}
              alt="folder image"
              priority={true}
            />
          </div>
          <div>
            <h3 className="text-center text-xl font-bold text-gray-950/80 dark:text-gray-300/70">
              Add Entries!
            </h3>
            <p className="text-base font-medium text-gray-950/50 dark:text-gray-300/25">
              Click the bouncing button.
            </p>
          </div>
        </div>
      )}

      {/*I brought the button here so I can animate-pulse if there has been no entries. */}
      <Link href="/add-new-entry">
        <Button bounce={totalEntries < 1 && true} type="fab" />
      </Link>
    </>
  );
};

export default FeedSearch;

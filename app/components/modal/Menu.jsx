"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BiDotsHorizontal, BiDotsVertical } from "react-icons/bi";

const Menu = ({ nav = false, entryTitle, entryID }) => {
  // I set the nav to toggle between vertical and horizontal menu icon.
  // I brought in entryTitle and entryID for dynamic routing to the edit page.

  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);

  // mostly used to detect click outside its reference.
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  // I use this useEffect hook to listen for a click outside the menu modal so that I can remove focus from it.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !menuRef.current?.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) {
        // alert("outside clicked");
        setIsFocused(false);

        // console.log("outside clicked");
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuRef]);

  //User clicks menu button
  const handleClick = () => {
    if (isFocused) {
      // to close the menu if user clicks on it while its open.
      buttonRef.current.blur(); // remove focus
      setIsFocused(false);
    } else {
      buttonRef.current.focus();
      setIsFocused(true);
    }
  };

  // User clicks on "edit from the menu"
  const handleLink = () => {
    // console.log("menu entrytitle :", entryTitle);
    // returns entryTitle in titleCase
    const title = entryTitle.split(" ").reduce((all, value, index) => {
      all += value;
      if (index === 0) {
        value.toUpperCase();
      }
      return all;
    });
    //

    const href = `/edit/${title}/${entryID}`;
    setIsFocused(false);
    router.push(href);
  };

  // User clicks on "delete" from the menu.
  const handleDelete = () => {
    // console.log("Clicked delete on " + entryTitle);
    let existingEntries = JSON.parse(localStorage.getItem("ledgerString"));
    // console.log("Prev :", existingEntries);

    // to filter out the deleted entry.
    existingEntries = existingEntries.filter(
      (entry) => entry.title.toLowerCase() !== entryTitle.toLowerCase(),
    );
    // console.log("New :", existingEntries);

    // set the filtered(new) entry back to localstorage
    localStorage.setItem("ledgerString", JSON.stringify(existingEntries));

    setIsFocused(false);

    // if we are on home page, we reload so that the feed can re-render. if we are on view-entry page(nav), go back to home page.
    nav ? router.push("/home") : window.location.reload();
  };

  // to show the modal
  const menuVisibility = isFocused ? "visible" : "hidden";

  // frontend: for setting the position of the modal
  const top = nav ? "top-9" : "top-5";

  return (
    <>
      <button
        ref={buttonRef}
        id="dmi"
        data-dropdown-toggle="dropdownDots"
        className="inline-flex items-center rounded px-2 hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-50/30  dark:hover:bg-gray-200/5 dark:focus:bg-gray-300/5 dark:focus:ring-gray-50/5"
        type="button"
        onClick={handleClick}
      >
        {/* toggle nav hori. for home page(card). verti. for view-entry page(nav) */}
        {nav ? (
          <BiDotsVertical className="h-5 w-5 fill-blue-500" />
        ) : (
          <BiDotsHorizontal className="h-5 w-6 fill-gray-700/50 dark:fill-white/20" />
        )}
      </button>

      <div
        id="dropdownDots"
        className={`${menuVisibility} absolute right-9 ${top} z-50 w-24 rounded-lg bg-white shadow-lg dark:bg-gray-700`}
        ref={menuRef}
      >
        <ul
          className="divide-y divide-gray-400/10 py-1 text-sm text-gray-700 dark:text-gray-300/90"
          aria-labelledby="dmi"
        >
          <li>
            <span
              onClick={handleLink}
              className="block px-4 py-1 hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-200/5 dark:active:bg-gray-300/5"
            >
              Edit
            </span>
          </li>
          <li>
            <span
              onClick={handleDelete}
              className="block px-4 py-1 hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-200/5 dark:active:bg-gray-300/5"
            >
              Delete
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Menu;

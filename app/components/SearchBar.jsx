"use client";

import { useState } from "react";

const SearchBar = ({ setEntries, setIsSearching }) => {
  // search query
  const [query, setQuery] = useState("");

  // User starts searching
  const handleChange = async (e) => {
    e.preventDefault();
    const value = e.target.value;

    //set state
    setQuery(value);
    setIsSearching(true);

    const allEntries = JSON.parse(localStorage.getItem("ledgerString"));
    // console.log("response allEntries", allEntries);

    // When the search query(value) includes text that is === to text in the title, descr or tag, this function returns a filtered array. I used "value" instead of the state query because "setQuery(value)" doesnt update components immediately but "value" does.
    const filteredEntries = allEntries.filter((entry) => {
      return (
        entry.title.toLowerCase().includes(value.toLowerCase()) ||
        entry.description.toLowerCase().includes(value.toLowerCase()) ||
        entry.tag.toLowerCase().includes(value.toLowerCase())
      );
    });

    // set state
    setEntries(filteredEntries);

    // I set value to localstorage so that I can load it in Card component. This was done for frontend reasons(marking the queryed.)
    localStorage.setItem("appQuery", value);
  };

  // The margin-top utility is to make sure that the search bar and the rest of the body does not overlap with the navbar(which is fixed).

  return (
    <div className="mb-16 mt-28 grid place-items-center px-6 md:mb-20 md:mt-32">
      <input
        value={query}
        onChange={handleChange}
        type="text"
        className="w-full max-w-lg rounded bg-white/50 px-4  py-2 text-sm text-gray-800/90 caret-blue-500 shadow-lg focus:outline-0 dark:border-2 dark:border-gray-400/10 dark:bg-transparent dark:text-white dark:shadow-none dark:placeholder:text-gray-300/40 dark:focus:border-gray-400/20"
        placeholder="Search by name, tag or description..."
      />
    </div>
  );
};

export default SearchBar;

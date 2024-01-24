"use client";

import React, { useEffect, useState } from "react";

const getApps = () => {
  const [allEntries, setAllEntries] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    if (typeof Window !== "undefined" && window.localStorage) {
      // get all entries
      const item = localStorage.getItem("ledgerString");

      const all =
        item !== null ? JSON.parse(localStorage.getItem("ledgerString")) : [];

      // set state
      setAllEntries(all);

      // Total amount of entries
      const total = all.length;
      // set state
      setTotalEntries(total);

      // console.log("App directory length is : ", totalEntries);
    }
  }, []);

  // console.log("Returned Entry :", totalEntries);
  // console.log("Returned apps :", allApps);

  return [allEntries, totalEntries];
};

export default getApps;

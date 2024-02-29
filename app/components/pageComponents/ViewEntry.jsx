"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import BarThree from "@/app/components/nav/BarThree";
import InputField from "@/app/components/Input";

const ViewEntry = () => {
  const [entry, setEntry] = useState({});
  const router = useRouter();

  //get id from url
  const [_, id] = useParams().data;
  // console.log("id(url) : ", id);

  useEffect(() => {
    if (typeof Window !== "undefined" && window.localStorage) {
      // get entry from id(url) n id(existingEntry.id)
      let appDir = JSON.parse(localStorage.getItem("ledgerString"));
      appDir = appDir.filter((entry) => entry.id === id);
      appDir = appDir[0];
      // console.log("My appDir :", appDir);

      setEntry(appDir);

      // return title in titleCase
      const entryTitle = appDir.title.split(" ").reduce((all, value, index) => {
        all += value;
        if (index === 0) {
          value.toUpperCase();
        }
        return all;
      });
      // console.log(entryTitle);

      // This will make sure that we always maintain an updated url after possible editing of the title name on the edit page.
      const href = `/view-entry/${entryTitle}/${id}`;
      router.replace(href);
    }
  }, []);

  // console.log("My entry :", entry);
  // Object.keys(entry).map((key) => {
  //   console.log(entry[key]);
  // });

  // console.log(entry.title, entry.id);

  return (
    <>
      <BarThree title={entry.title} id={entry.id} />

      {/* The margin-top utility is to make sure that the search bar and the
      rest of the body does not overlap with the navbar(which is fixed). */}
      <h3 className="mb-7 mt-24 text-center text-base text-gray-950/80 dark:text-gray-300/40">
        Tap any field to copy its contents
      </h3>

      <form
        data-aos="fade-up"
        className="mb-10 grid h-full place-items-center gap-2 px-6"
      >
        {/* .slice so that I skip "id" */}
        {Object.keys(entry)
          .slice(1)
          .map((key, index) => {
            return (
              <InputField
                key={index}
                label={key.toUpperCase()}
                type={key === "link" ? "url" : key}
                field={key === "description" ? "defaultText" : "default"}
                iconPriority={key === "password" || (key === "link" && true)}
                read={true}
                value={entry[key]}
                name={key}
              />
            );
          })}
      </form>
    </>
  );
};

export default ViewEntry;

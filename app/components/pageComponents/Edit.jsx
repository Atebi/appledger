"use client";

import { useEffect, useState } from "react";
import BarFour from "@/app/components/nav/BarFour";
import InputField from "@/app/components/Input";
import Button from "@/app/components/Button";
import { useRouter, useParams } from "next/navigation";

const Edit = () => {
  const [submitting, setIsSubmitting] = useState(false); // for button animation purposes
  const [entry, setEntry] = useState({});
  const router = useRouter();

  // extract title from query params
  const [title, _] = useParams().slug;
  // console.log("tite: ", title);
  const searchParams = title.toLowerCase();

  // This useEffect hook is used to load ledger from local storage and extract the particular entry whose "title" is equal to that of the "title" from the search params.
  useEffect(() => {
    if (typeof Window !== "undefined" && window.localStorage) {
      let appDir = JSON.parse(localStorage.getItem("ledgerString"));

      // returns an array of (1) entry
      appDir = appDir.filter(
        (entry) => entry.title.toLowerCase() === searchParams,
      );
      // console.log("My appDir :", appDir[0]);
      setEntry(appDir[0]);
    }
  }, []);

  // console.log("My entry :", entry);
  // Object.keys(entry).map((key) => {
  //   console.log(key);
  // });

  const saveEntry = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const existingEntries = JSON.parse(localStorage.getItem("ledgerString"));
    // console.log("onsubmit existingEntries :", existingEntries);
    // const nameExists = existingEntries.some(
    //   (entry) => entry.title.toLowerCase() === entry.title.toLowerCase()
    // );
    // console.log("onsubmit same name :", nameExists);

    // check for same "id"
    const sameID = existingEntries.some((ent) => ent.id === entry.id);
    // console.log("onsubmit same id :", sameID);

    if (sameID) {
      // get the index
      const index = existingEntries.findIndex(
        (entry) => entry.title.toLowerCase() === searchParams,
      );
      // console.log("index of current entry :", index);

      // This function uses .splice arrayMethod to REPLACE the previous entry, at the same position or index(gotten above), with the edited(new) entry. This method places the newly edited entry at the same position it was in creation.
      existingEntries.splice(index, 1, entry);
      // console.log("existingEntries after splice :", existingEntries);
      localStorage.setItem("ledgerString", JSON.stringify(existingEntries));

      router.back();
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <BarFour title_text="Edit" />

      {/* The margin-top utility is to make sure that the search bar and the
      rest of the body does not overlap with the navbar(which is fixed). */}
      <h3 className="mb-7 mt-24 text-center text-base text-gray-950/80 dark:text-gray-300/40">
        {entry.title}
      </h3>

      <form
        onSubmit={saveEntry}
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
                type={key === "password" ? "text" : key}
                field={key === "description" ? "text" : ""}
                iconPriority={key === "password" || (key === "link" && true)}
                edit={true}
                value={entry[key]}
                name={key}
                entry={entry}
                setEntry={setEntry}
              />
            );
          })}

        <Button
          type="default"
          submitting={submitting}
          text={submitting ? "Saving..." : "Save"}
        />
      </form>
    </>
  );
};

export default Edit;

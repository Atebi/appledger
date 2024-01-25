"use client";

import React, { useState } from "react";
import BarFour from "../nav/BarFour";
import InputField from "../Input";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import getApps from "@/app/utils/localStorage";

const NewEntry = () => {
  const router = useRouter();

  const [submitting, setIsSubmitting] = useState(false); // mostly for button animation
  const [entry, setEntry] = useState({}); // to create new entry

  // load apps from local storage on first render
  const [allApps, _] = getApps();
  // console.log("all appsons", allApps);

  const addEntry = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const existingEntries = allApps;
    // console.log("Existing entry all apps", existingEntries);
    // check if entry already exists. We use title(names) because "id" will always be a unique value.
    const entryExists = existingEntries.some(
      (ent) => ent.title.toLowerCase() === entry.title.toLowerCase(),
    );

    // if entry doesnt already exist, then it is indeed a new entry. Add to localeStorage
    if (!entryExists) {
      // const appID = { id: uuidv4() };
      const newEntry = { id: uuidv4(), ...entry };

      // console.log("New app with id :", newEntry);
      existingEntries.unshift(newEntry);
      localStorage.setItem("ledgerString", JSON.stringify(existingEntries));

      router.push("/home");
      setIsSubmitting(false);
    } else {
      alert(
        "Sorry! the name of the entry you are trying to create already exists!",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <BarFour title_text="New" />

      {/* The margin-top utility is to make sure that the search bar and the
      rest of the body does not overlap with the navbar(which is fixed). */}
      <h3 className="mb-7 mt-24 text-center text-base text-gray-950/80 dark:text-gray-300/40">
        Create new entry.
      </h3>

      <form
        onSubmit={addEntry}
        className="mb-10 grid h-full place-items-center gap-2 px-6"
      >
        {/* Required fields. (3). required is set to "true" in the input component */}
        {/* The title, description and tag fields are required fields and must have a value. */}
        <InputField
          label="Name"
          placeholder="What's the name of the app?"
          value={entry.title}
          name="title"
          entry={entry}
          setEntry={setEntry}
        />
        <InputField
          field="text"
          value={entry.description}
          name="description"
          entry={entry}
          setEntry={setEntry}
        />
        <InputField
          label="Tag"
          placeholder="Tag"
          value={entry.tag}
          entry={entry}
          name="tag"
          setEntry={setEntry}
          // edit={true}
          // iconPriority={true}
        />
        {/****/}

        {/* Fields from this point on are not required to be filled and can be removed by users. */}
        {/* edit and iconpriority are set and are set to true so that the "cancle-icon" can come up which will enable users delete a field they arent interested in. */}

        <InputField
          label="Password"
          value={entry.password}
          entry={entry}
          name="password"
          setEntry={setEntry}
          edit={true}
          iconPriority={true}
        />

        <InputField
          label="Link"
          value={entry.link}
          entry={entry}
          name="link"
          type="url"
          setEntry={setEntry}
          // submitting={submitting}
          edit={true}
          iconPriority={true}
        />

        <InputField
          label="Username"
          value={entry.username}
          entry={entry}
          name="username"
          setEntry={setEntry}
          edit={true}
          iconPriority={true}
        />

        <InputField
          label="Email"
          value={entry.email}
          entry={entry}
          name="email"
          setEntry={setEntry}
          edit={true}
          iconPriority={true}
        />

        <InputField
          label="Phone"
          value={entry.phone}
          entry={entry}
          name="phone"
          setEntry={setEntry}
          edit={true}
          iconPriority={true}
        />

        <Button
          type="default"
          disabled={submitting}
          text={submitting ? "Creating..." : "Create"}
        />
      </form>
    </>
  );
};

export default NewEntry;

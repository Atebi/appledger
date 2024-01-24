"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "../Input";
import Button from "../Button";

//TODO NOT FUNCTIONAL

const Modal = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [entry, setEntry] = useState({});
  const router = useRouter();

  alert("This modal isn't functional yet. Click backgroung to go back");
  return (
    <div
      onClick={() => router.back()}
      className="absolute left-0 top-0 grid h-screen w-screen place-items-center bg-gray-300/90 px-4 transition duration-300 ease-in dark:bg-gray-700/90"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-50 grid w-full max-w-sm place-items-center gap-6 bg-stone-100 py-7 dark:bg-stone-950"
      >
        <h1 className="border-l-2 border-blue-500 pl-2.5 pt-1 text-2xl font-thin text-gray-500 dark:text-gray-300/40">
          New Field
        </h1>

        <form
          onSubmit={(e) => router.back()}
          className="grid h-full place-items-center gap-2 px-6"
        >
          <InputField
            label="Field Name"
            required={true}
            type="text"
            name="title"
            value={entry.title}
            entry={entry}
            setEntry={setEntry}
          />
          <InputField
            label="Field Data"
            required={true}
            type="text"
            name="data"
            value={entry.data}
            entry={entry}
            setEntry={setEntry}
          />

          <Button
            type="default"
            submitting={submitting}
            text={submitting ? "Adding..." : "Add"}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;

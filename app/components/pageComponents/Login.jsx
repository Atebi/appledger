"use client";

import { useState } from "react";
import BarOne from "../nav/BarOne";
import InputField from "../Input";
import Button from "../Button";

export default function Login() {
  const [submitting, setIsSubmitting] = useState(false);
  const [entry, setEntry] = useState({});

  return (
    <>
      <BarOne />

      <h3 className="mb-7 text-center text-base text-gray-950/80 dark:text-gray-300/40">
        Please input master password.
      </h3>

      <form
        action="/appledger/home"
        className="grid h-full place-items-center gap-2 px-6"
      >
        <InputField
          required={true}
          type="password"
          label="Master Password"
          // field="default"
          // edit={true}
          iconPriority={true}
          value={entry.password}
          name="password"
          entry={entry}
          setEntry={setEntry}
        />

        <InputField
          required={true}
          type="password"
          label="Confirm"
          // field="default"
          // edit={true}
          iconPriority={true}
          value={entry.cpassword}
          name="cpassword"
          entry={entry}
          setEntry={setEntry}
        />

        <Button
          type="default"
          submitting={submitting}
          text={submitting ? "Login..." : "Login"}
        />
      </form>
    </>
  );
}

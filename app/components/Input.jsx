"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoEye, IoEyeOff, IoSend, IoCloseCircle } from "react-icons/io5";
const InputField = ({
  field,
  type = "text",
  label,
  placeholder,
  read = false,
  edit = false,
  iconPriority = false,
  required = false,
  value,
  name,
  entry,
  setEntry,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputType, setInputType] = useState(type);
  const ref = useRef(null);
  const isEdit = useParams().slug;

  // useEffect(() => {
  //   console.log("isFocused: ", isFocused);
  // }, [isFocused]);

  // iconPriority can be set to true for certain fields like the password so that users can toggle. It would be set to false for title, descr, and tag because they are required of the app.
  const iconVisibility = iconPriority ? "visible" : "invisible";

  // Input field border state
  const borderState = read
    ? "outline-none border-gray-400/20 dark:border-gray-400/10"
    : isFocused
    ? "outline-none ring-blue-500 border-blue-500"
    : "border-gray-400/20 dark:border-gray-400/10";

  const togglePassword = () => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };

  // User deletes input field by click on the cancle button(which only shows up if edit=true)
  const deleteField = (e) => {
    // console.log("current key :", name);
    // returns a new object which excludes the deleted field
    const newEntry = Object.keys(entry)
      .filter((key) => key !== name)
      .reduce((obj, key) => {
        obj[key] = entry[key];
        return obj;
      }, {});
    // console.log("newPost :", newPost);

    // state update
    setEntry(newEntry);
    // console.log("updated post :", entry);

    // get the actual field in the dom and remove it
    const child = e.currentTarget;
    // console.log("child :", child);
    const grand = child.parentElement.parentElement;
    // console.log("Parent parent", grand);
    // if on the edit page, no need to remove the field, doing so returns an error
    !isEdit && grand.remove();
  };

  // Entry name, tag and description are required of the app. descr is required in textArea.
  if (name === "title" || name === "tag") required = true;

  // set hashtag to be visible for tag field
  const tagVisibility = name === "tag" ? "visible" : "hidden";

  // if user is on edit or add-new-entry page, return a cancle icon so they can remove any field they dont need(excluding the "required fields"). // set password icon toggling. // if inputType is url, return a "send" icon that onClick, takes them to the url value.
  const icon = edit ? (
    // for edit and add-new-entry page
    <span onClick={deleteField}>
      <IoCloseCircle className="h-4 w-4 fill-gray-500 hover:fill-gray-400" />
    </span>
  ) : // for login and view-entry page
  inputType === "password" || inputType === "text" ? (
    <span onClick={togglePassword}>
      {inputType === "password" ? (
        <IoEyeOff className="h-4 w-4 fill-gray-500 hover:fill-gray-400" />
      ) : (
        <IoEye className="h-4 w-4 fill-gray-500 hover:fill-gray-400" />
      )}
    </span>
  ) : (
    // for view-entry page only
    inputType === "url" && (
      <Link href={value} target="_blank">
        <span>
          <IoSend className="h-4 w-4 fill-gray-500 hover:fill-gray-400" />
        </span>
      </Link>
    )
  );

  // set text color to blue when its the tag or link field
  let text_colour = "font-medium text-gray-700/75 dark:text-gray-300/90";
  if (name === "link" || name === "tag")
    text_colour = "font-medium text-blue-500 dark:text-blue-500";

  const cursor = read ? "cursor-default" : "cursor-auto";

  // for view-entry page, when a user clicks the field, copy field's value to clipboard
  const copyToClipboard = async () => {
    if (field === "default" || field === "defaultText") {
      await navigator.clipboard.writeText(value);
      alert(`"${value}" copied to clipboard!`);
    }
  };

  // There are (4) types of fields. text, defaultText, default and (nil). text and default text are <textarea></textarea> fields. default and (nil) are <Input /> fields.

  // fields that have "default" attached to it are for readOnly and are only used on the view-entry page.
  // other pages utilize the text and (nil) fields which utilize useState() et al... so we can set and edit entries as we like.

  return (
    <div
      className={`grid h-fit w-full max-w-xs grid-cols-12 border-2 bg-white/50 md:max-w-xl ${borderState} rounded-lg px-3 py-2 dark:bg-transparent md:px-4`}
    >
      <div onClick={copyToClipboard} className="col-span-10">
        {field === "text" ? (
          <>
            <div>
              <label className="mb-3 w-full text-sm font-normal tracking-wide text-gray-700/80 dark:text-gray-300/40">
                Description/Function
              </label>
            </div>

            <div>
              <textarea
                ref={ref}
                className={`w-full bg-transparent ${cursor} text-base ${text_colour} resize-none overflow-hidden caret-blue-500 placeholder:text-gray-300 focus:outline-0 dark:bg-transparent dark:text-gray-300/90 dark:placeholder:text-gray-300/20`}
                value={entry[name] || ""}
                onChange={(e) => setEntry({ ...entry, [name]: e.target.value })}
                placeholder="What is its function?"
                // readOnly={read}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                rows="2"
                cols="50"
                required
              ></textarea>
            </div>
          </>
        ) : field === "default" ? (
          <>
            <div>
              <label className="mb-3 w-full text-sm font-normal tracking-wide text-gray-700/80 dark:text-gray-300/40">
                {label}
              </label>
            </div>

            <div className="flex">
              <div className={`${tagVisibility} text-base text-blue-500`}>
                #
              </div>
              <input
                ref={ref}
                type={inputType}
                className={`w-full bg-transparent ${cursor} text-base ${text_colour} caret-blue-500 placeholder:text-gray-300 focus:outline-0 dark:bg-transparent dark:placeholder:text-gray-300/20`}
                value={value || ""}
                placeholder={placeholder}
                readOnly={read}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required={required}
              />
            </div>
          </>
        ) : field === "defaultText" ? (
          <>
            <div>
              <label className="mb-3 w-full text-sm font-normal tracking-wide text-gray-700/80 dark:text-gray-300/40">
                {label}
              </label>
            </div>

            <div>
              <textarea
                ref={ref}
                className={`w-full bg-transparent ${cursor} text-base ${text_colour} resize-none overflow-hidden caret-blue-500 placeholder:text-gray-300 focus:outline-0 dark:bg-transparent dark:text-gray-300/90 dark:placeholder:text-gray-300/20`}
                value={value || ""}
                placeholder="What is its function?"
                readOnly={read}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                rows="2"
                cols="50"
                required
              ></textarea>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="mb-3 w-full text-sm font-normal tracking-wide text-gray-700/80 dark:text-gray-300/40">
                {label}
              </label>
            </div>

            <div className="flex">
              <div className={`${tagVisibility} text-base text-blue-500`}>
                #
              </div>
              <input
                ref={ref}
                type={inputType}
                className={`w-full bg-transparent ${cursor} text-base ${text_colour} caret-blue-500 placeholder:text-gray-300 focus:outline-0 dark:bg-transparent  dark:placeholder:text-gray-300/20`}
                value={entry[name] || ""}
                onChange={(e) => setEntry({ ...entry, [name]: e.target.value })}
                placeholder={placeholder}
                // readOnly={read}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required={required}
                autoFocus={name === "title" ? true : false}
              />
            </div>
          </>
        )}
      </div>

      <div
        className={`${iconVisibility} col-end-13 self-center border-l-2 border-gray-400/20 py-2 pl-1.5 dark:border-gray-400/10`}
      >
        {icon}
      </div>
    </div>
  );
};

export default InputField;

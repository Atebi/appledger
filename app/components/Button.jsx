import React from "react";

const Button = ({ type = "default", text, submitting, bounce = false }) => {
  const animate = submitting ? "animate-pulse" : "animate-none";

  // Bounce to make the FAB button bounce when there's no entry yet.
  const animateBounce = bounce ? "animate-bounce" : "animate-none";

  // Primary button
  const button =
    type === "default" ? (
      <button
        type="submit"
        // disabled={disabled}
        className={`w-full max-w-xs rounded bg-blue-500 px-4 py-1.5 font-medium text-white hover:bg-blue-600 ${animate}`}
      >
        {text}
      </button>
    ) : // Secondary button, to invoke the add field modal.
    type === "outline" ? (
      <button className="w-full max-w-xs rounded bg-blue-500 px-4 py-1.5 text-center font-medium text-white hover:bg-blue-600">
        + Field
      </button>
    ) : (
      // fab btn to go to the add-new-entry page
      type === "fab" && (
        <button
          className={`${animateBounce} fixed bottom-10 right-4 z-50 h-14 w-14 rounded-2xl bg-blue-500 py-1 pl-4 pr-4 text-center text-2xl text-white drop-shadow-lg hover:bg-blue-600 hover:drop-shadow-2xl active:animate-pulse lg:bottom-24 lg:w-fit lg:pr-6`}
        >
          +
          <span className="hidden align-middle text-lg font-medium lg:inline">
            {" "}
            Create
          </span>
        </button>
      )
    );

  return button;
};

export default Button;

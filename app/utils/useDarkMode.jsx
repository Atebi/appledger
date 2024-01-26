"use client";

import React, { useEffect, useState } from "react";

const useDarkMode = () => {
  const [theme, setTheme] = useState(
    typeof Window !== "undefined" && window.localStorage
      ? localStorage.theme
      : "dark",
  );

  // typeof Window !== "undefined" && window.localStorage
  //   ? localStorage.theme
  //   : "dark",
  // Window !== "undefined" ? localStorage.theme : "dark",

  const colorTheme = theme === "dark" ? "light" : "dark";

  // const colorTheme = theme === "" ? "light" : theme;
  // const colorTheme = theme;

  useEffect(() => {
    // const mode =
    //   typeof Window !== "undefined" && window.localStorage
    //     ? localStorage.theme
    //     : "dark";

    // console.log("mode:", mode);

    // setTheme(mode);
    // console.log("mode theme", theme);

    const root = document.documentElement;

    root.classList.remove(colorTheme);
    // console.log("removed classlist from root:", colorTheme);

    const skin = theme === "" ? "light" : theme;

    root.classList.add(skin);
    // console.log("added classlist to root:", skin);

    if (Window !== "undefined") {
      localStorage.setItem("theme", skin);
    }
  }, [theme]);

  return [colorTheme, setTheme];
};

export default useDarkMode;

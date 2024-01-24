"use client";

import React, { useEffect, useState } from "react";

const useDarkMode = () => {
  const [theme, setTheme] = useState(
    Window !== "undefined" ? localStorage.theme : "dark",
  );

  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (Window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return [colorTheme, setTheme];
};

export default useDarkMode;

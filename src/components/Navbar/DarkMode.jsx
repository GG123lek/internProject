import React, { useEffect } from "react";

const DarkMode = () => {
  useEffect(() => {
    document.documentElement.classList.remove("dark"); // Ensure dark mode is removed
    localStorage.setItem("theme", "light"); // Always store 'light' mode
  }, []);

  return null; // Remove the dark mode toggle buttons
};

export default DarkMode;

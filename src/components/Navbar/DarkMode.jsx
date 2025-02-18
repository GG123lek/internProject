import React, { useEffect } from "react";

const DarkMode = () => {
  useEffect(() => {
    document.documentElement.classList.remove("dark"); 
    localStorage.setItem("theme", "light"); 
  }, []);

  return null; 
};

export default DarkMode;

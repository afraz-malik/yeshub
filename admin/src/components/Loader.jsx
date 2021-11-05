import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ACTIVATE_LOADER, DEACTIVATE_LOADER } from "../config/config";

const Loader = () => {
  const [isActive, toggleLoader] = useState(false);

  const activeLoader = () => {
    toggleLoader(true);
  };

  const hideLoader = () => {
    toggleLoader(false);
  };

  useEffect(() => {
    document.addEventListener(ACTIVATE_LOADER, activeLoader);
    document.addEventListener(DEACTIVATE_LOADER, hideLoader);

    return () => {
      document.removeEventListener(ACTIVATE_LOADER, activeLoader);
      document.removeEventListener(DEACTIVATE_LOADER, hideLoader);
    };
  }, []);

  return <div className={`loader ${isActive ? "active" : ""}`} />;
};

export default Loader;

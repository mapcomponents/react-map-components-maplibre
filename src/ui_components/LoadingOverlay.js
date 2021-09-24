import React, { useContext } from "react";

import { LoadingOverlayContext } from "../ui_components/LoadingOverlayContext";

import FadeLoader from "react-spinners/FadeLoader";
import "./LoadingOverlay.css";

function LoadingOverlay() {
  const loadingOverlayContext = useContext(LoadingOverlayContext);
  let { fadeoutAnimation, visible } = loadingOverlayContext;

  return (
    <div
      className={
        fadeoutAnimation ? "loadingOverlay-fadeout" : "loadingOverlay-fadein"
      }
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "#000",
        zIndex: 1000000,
        overflow: "hidden",
        display: visible ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FadeLoader
        color={"#ababab"}
        loading={visible}
        css={{ display: "block", borderColor: "red" }}
        size={50}
      />
    </div>
  );
}

export default LoadingOverlay;

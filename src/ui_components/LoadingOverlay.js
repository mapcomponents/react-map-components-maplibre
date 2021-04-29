import React, { useEffect, useState, useContext } from "react";

import { LoadingOverlayContext } from "../ui_components/LoadingOverlayContext";
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
        alignItems: "stretch",
        justifyContent: "center",
      }}
    >
      <video autoPlay muted>
        <source src="/assets/wh.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default LoadingOverlay;

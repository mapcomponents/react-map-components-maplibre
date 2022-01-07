import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export default function TopToolbar(props) {
  return (
    <div
      style={{
        flexGrow: 1,
        zIndex: 120,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <AppBar
        sx={{
          minHeight: "62px",
          backgroundColor: "#f1f1f1",
        }}
        color="primary"
        position="static"
      >
        <Toolbar>{props.children}</Toolbar>
      </AppBar>
    </div>
  );
}

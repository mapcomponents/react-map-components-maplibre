import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 120,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  AppBar: {
    backgroundColor: "#fafafa",
    minHeight: "62px",
  },
}));

export default function TopToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.AppBar} position="static">
        <Toolbar>{props.children}</Toolbar>
      </AppBar>
    </div>
  );
}

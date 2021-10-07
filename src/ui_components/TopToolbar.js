import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

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

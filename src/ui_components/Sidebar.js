import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexGrow: 1,
    zIndex: 90,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#fafafa",
  },
  drawerPaper: {
    position: "static",
    display: "flex",
    alignItems: "stretch",
    alignContent: "stretch",
    flexDirection: "column",
    padding: "90px 10px 10px 23px",
    boxSizing: "border-box",
    minWidth: "150px",
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={true}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {props.children}
    </Drawer>
  );
}

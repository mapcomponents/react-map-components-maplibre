import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  drawer: {
    boxShadow: "0px 2px 3px 2px rgb(0,0,0, .4)",
    flexGrow: 1,
    zIndex: 110,
    position: "absolute",
    top: "100px",
    left: 0,
    height: "275px",
    backgroundColor: "#aecaec",
  },
  drawerPaper: {
    position: "static",
    display: "flex",
    alignItems: "stretch",
    alignContent: "stretch",
    flexDirection: "column",
    padding: "10px 10px 10px 10px",
    boxSizing: "border-box",
    minWidth: "170px",
  }
}));

export default function Legend(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor={"left"}
      open={true}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      {props.children}
    </Drawer>
  );
}

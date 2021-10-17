import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Drawer from "@mui/material/Drawer";

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexGrow: 1,
    zIndex: 101,
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

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={true}
      classes={{
        paper: classes.drawerPaper,
      }}
      sx={{
        ...props.sx,
      }}
    >
      {props.children}
    </Drawer>
  );
}

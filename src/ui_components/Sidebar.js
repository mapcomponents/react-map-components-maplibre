import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Drawer from "@mui/material/Drawer";
import { InsertInvitationOutlined } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexGrow: 1,
    zIndex: 101,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#fafafa",
    display: "flex",
    flexDirection: "column",
    alignContent: "stretch",
    alignItems: "stretch",
  },
  drawerPaper: {
    position: "initial",
    padding: "20px",
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

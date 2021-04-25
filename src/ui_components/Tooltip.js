import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    position: "fixed",
    top: "100px",
    left: "100px",
    zIndex: 100000,
  },
}));

export default function Legend(props) {
  const classes = useStyles();
  const theme = useTheme();

  return <div className={classes.tooltip}>tooltip</div>;
}

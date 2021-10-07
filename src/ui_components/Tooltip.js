import React from "react";
import { useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";

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

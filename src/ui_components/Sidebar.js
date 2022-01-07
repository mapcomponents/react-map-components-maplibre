import React, {useState} from "react";
import { styled } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexGrow: 1,
    zIndex: 105,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#fafafa",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    alignContent: "stretch",
  },
  drawerPaper: {
    position: "initial !important",
    boxSizing: "border-box",
    padding: "40px",
    visibility: "visible !important",
    zIndex: "initial !important",
  },
  drawerHeader: {
    alignContent: "flex-start",
    display: "flex",
  },
  drawerContent: {},
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const mediaIsMobile = useMediaQuery("(max-width:900px)");

  const [drawerOpen, setDrawerOpen] = useState(true);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleDrawerOpen}
        style={{
          zIndex: 101,
          position: "relative",
          padding: "20px",
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        transitionDuration={0}
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
        sx={{
          ...props.sx,
          ...{
            maxWidth: mediaIsMobile ? "90vw" : "20vw",
          },
          ...(drawerOpen ? {} : { left: mediaIsMobile ? "-90vw" : "-20vw" }),
        }}
      >
        <DrawerHeader className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon
              style={
                {
                  //paddingBottom: "40px",
                }
              }
            />
          </IconButton>
        </DrawerHeader>
        <div style={{ maxWidth: "100%" }}>{props.children}</div>
      </Drawer>
    </>
  );
}

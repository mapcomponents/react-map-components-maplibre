import React, {useState} from "react";
import { useTheme, styled } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from '@mui/icons-material/Menu';

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
    SflexDirection: "column", 
    alignItems: "stretch",
    alignContent: "stretch", 
  },
}));        

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));
const DrawerMain = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [drawerState, setDrawerWidth] = useState(true);

  let changeDrawerWidth = drawerState ? "500" : "0"; 
  let displayCloseButton = drawerState ? "" : "none";
  let displayOpenButton = drawerState ? "none" : "";

  const handleDrawerOpen =() => {
    setDrawerWidth(true);
  };
  const handleDrawerClose =() => {
    setDrawerWidth(false);
  }; 

  return (
    <>

      <MenuIcon onClick={ handleDrawerOpen } style = {{  
        display: displayOpenButton,
        zIndex: 50000,
        position: "relative",
        padding: "20px",}}/>
    
      <Drawer
        style = {{ width: changeDrawerWidth }}
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerState}
        sx={{
          ...props.sx,
        }}
      > 
        <DrawerHeader>
          <DrawerMain style = {{ 
            display: displayCloseButton,
            position: "relative",
            padding: "40px",}}
          >          
          {props.children}
          </DrawerMain>

          <ChevronLeftIcon onClick={ handleDrawerClose } style = {{ 
            display: displayCloseButton,
            padding: "20px",
          }}/>
        </DrawerHeader>

      </Drawer>
  </>
  );
}

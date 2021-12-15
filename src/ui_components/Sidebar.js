import React, {useState} from "react";
import { useTheme, styled } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";

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
    padding: "40px",
  },
  drawerHeader: {
    alignContent: "flex-start",
    display: "flex",
  },
  drawerContent: {
  },
}));        

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [drawerState, setDrawerWidth] = useState(true);

  let changeDrawerWidth = drawerState ? "300" : "0"; 

  const handleDrawerOpen =() => {
    setDrawerWidth(true);
  };
  const handleDrawerClose =() => {
    setDrawerWidth(false);
  }; 

  return (
    <>

      <IconButton onClick={ handleDrawerOpen } style = {{  
          zIndex: 101,
          position: "relative",
          padding: "20px",}}>
        <MenuIcon/>
      </IconButton>
      <Drawer
        style = {{ width: changeDrawerWidth }}
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerState}
        classes={{
          paper: classes.drawerPaper,
        }}
        sx={{
          ...props.sx,
        }}
      > 
        <DrawerHeader className={classes.drawerHeader}>
          <IconButton>
            <ChevronLeftIcon onClick={ handleDrawerClose } style = {{ 
              paddingBottom: "40px",
            }}/>
          </IconButton>
        </DrawerHeader>
        <div>

        </div>

        {props.children}

      </Drawer>
  </>
  );
}

import React, { useContext, useState } from "react";
import { AppContext } from "./AppContext";

import DistanceEntryForm from "./DistanceEntryForm";
import LoginForm from "./LoginForm";
import { Button, Grid, FormControlLabel, Switch, Dialog } from "@material-ui/core";

import logo from "./logo.svg";

function Header() {
  const appContext = useContext(AppContext);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showDistanceEntryForm, setShowDistanceEntryForm] = useState(false);

  return (
    <Grid container>
      <Grid xs={6} item>
        <img
          src={logo}
          style={{
            maxWidth: "31px",
            float: "left",
            marginRight: "10px",
          }}
          alt=""
        />
        <h1 style={{ margin: 0, padding: 0 }}>Lauf-Contest</h1>
      </Grid>
      <Grid xs={6} item style={{ display: "flex", justifyContent: "flex-end" }}>
        <FormControlLabel
          style={{ marginBottom: 0 }}
          labelPlacement="start"
          control={
            <Switch
              checked={appContext.darkMode}
              onChange={() => {
                appContext.setDarkMode(!appContext.darkMode);
              }}
              name="dark_mode_switch"
            />
          }
          label="Dark Mode"
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
          onClick={() => {
            setShowDistanceEntryForm(!showDistanceEntryForm);
          }}
        >
          Neuer Eintrag
        </Button>
        <Dialog
          fullScreen={false}
          open={showDistanceEntryForm}
          onClose={() => {
            setShowDistanceEntryForm(false);
          }}
          aria-labelledby="responsive-dialog-title"
        >
          <DistanceEntryForm />
        </Dialog>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
          onClick={() => {
            setShowLoginForm(!showLoginForm);
          }}
        >
          Login
        </Button>
        <Dialog
          fullScreen={false}
          open={showLoginForm}
          onClose={() => {
            setShowLoginForm(false);
          }}
          aria-labelledby="responsive-dialog-title"
        >
          <LoginForm />
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default Header;

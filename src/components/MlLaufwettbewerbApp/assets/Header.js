import React, { useState } from "react";
import { Button, Grid, FormControlLabel, Switch } from "@material-ui/core";

function Header({ darkMode, setDarkMode }) {
  return (
    <Grid container>
      <Grid xs={6} item>
        <h1 style={{ margin: 0, padding: 0 }}>Laufwettbewerb</h1>
      </Grid>
      <Grid xs={6} item style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary">
          Distanzeintrag
        </Button>
        <FormControlLabel
          labelPlacement="start"
          control={
            <Switch
              checked={darkMode}
              onChange={() => {
                setDarkMode(!darkMode);
              }}
              name="dark_mode_switch"
            />
          }
          label="Dark Mode"
        />
      </Grid>
    </Grid>
  );
}

export default Header;

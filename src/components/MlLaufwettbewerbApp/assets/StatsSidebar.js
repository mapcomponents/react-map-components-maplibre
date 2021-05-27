import React, { useContext } from "react";

import { useTheme } from "@material-ui/core/styles";
import { AppContext } from "./AppContext";
import { Grid, Paper, Typography } from "@material-ui/core";

function StatsSidebar() {
  const appContext = useContext(AppContext);
  const theme = useTheme();

  console.log(theme);
  return (
    <>
      <Grid container spacing={2} style={{ flexDirection: "row", flex: 1 }}>
        <Grid item xs={12}>
          <Paper elevation={1}>
            <Typography style={theme.classes.label}>Anzeigedatum:</Typography>
            <Typography variant="h2">
              {new Date(appContext.displayDate).toLocaleDateString("de-DE", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={1}>
            <Typography style={theme.classes.label}>Gelaufene Kilometer:</Typography>
            <Typography variant="h2">{appContext.routeProgressInKm} Km</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={1}>
            <Typography style={theme.classes.label}>Team Bonn:</Typography>
            <Typography variant="h3">
              {Math.round(appContext.routeProgressInKm * 0.7 * 100) / 100} Km
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={1}>
            <Typography style={theme.classes.label}>Team Berlin:</Typography>
            <Typography variant="h3">
              {Math.round(appContext.routeProgressInKm * 0.12 * 100) / 100} Km
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={1}>
            <Typography style={theme.classes.label}>Team Freiburg:</Typography>
            <Typography variant="h3">
              {Math.round(appContext.routeProgressInKm * 0.14 * 100) / 100} Km
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={1}>
            <Typography style={theme.classes.label}>Hamburg:</Typography>
            <Typography variant="h3">
              {Math.round(appContext.routeProgressInKm * 0.04 * 100) / 100} Km
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default StatsSidebar;

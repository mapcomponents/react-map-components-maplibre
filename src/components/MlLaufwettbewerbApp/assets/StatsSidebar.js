import React, { useContext } from "react";

import { useTheme } from "@material-ui/core/styles";
import { AppContext } from "./AppContext";
import { Grid, Paper, Typography } from "@material-ui/core";

function StatsBlock({ label, progress }) {
  const theme = useTheme();

  return (
    <Grid item xs={6}>
      <Paper elevation={1}>
        <Typography style={theme.classes.label}>{label}</Typography>
        <Typography variant="h3">
          {String(parseFloat(progress).toFixed(2)).replace(".", ",")} km
        </Typography>
      </Paper>
    </Grid>
  );
}

function StatsSidebar() {
  const appContext = useContext(AppContext);
  const theme = useTheme();

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
            <Typography variant="h2">
              {String(appContext.routeProgressInKm).replace(".", ",")} km
            </Typography>
          </Paper>
        </Grid>
        <StatsBlock
          label="Team Bonn:"
          progress={appContext.routeProgressInKm * 0.7}
        />
        <StatsBlock
          label="Team Berlin:"
          progress={appContext.routeProgressInKm * 0.12}
        />
        <StatsBlock
          label="Team Freiburg:"
          progress={appContext.routeProgressInKm * 0.14}
        />
        <StatsBlock
          label="Hamburg:"
          progress={appContext.routeProgressInKm * 0.04}
        />
      </Grid>
    </>
  );
}

export default StatsSidebar;

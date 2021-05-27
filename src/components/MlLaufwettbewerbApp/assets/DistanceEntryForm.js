import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DirectionsRun from "@material-ui/icons/DirectionsRun";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
}));

const DistanceEntryForm = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [date, setDate] = useState();
  const [distance, setDistance] = useState();

  useEffect(() => {
    var curr = new Date();
    curr.setDate(curr.getDate() + 3);
    var dateCurr = curr.toISOString().substr(0, 10);
    setDate(dateCurr);
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <DirectionsRun />
        </Avatar>
        <Typography component="h1" variant="h5">
          Distanzeintrag
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={classes.form}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            value={date}
            required
            fullWidth
            id="date"
            label="Datum"
            name="date"
            type="date"
            autoFocus
            onChange={(event) => {
              setDate(event.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            value={distance}
            required
            fullWidth
            name="distance"
            label="Km"
            type="number"
            id="distance"
            onChange={(event) => {
              setDistance(event.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Abschicken
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default DistanceEntryForm;

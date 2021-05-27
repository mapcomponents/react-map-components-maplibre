import "typeface-muli";

const colorTheme = {
  classes: {
    label: {
      //fontWeight: "bold",
      fontSize: "1.2rem",
      opacity: 0.8,
    },
    participantName: {
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
    participantPerformance: {
      fontSize: "1.1rem",
      //fontWeight: "bold",
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: "10px",
      },
    },
  },
  typography: {
    fontFamily: "Muli",
    h3: {
      fontWeight: "300",
      fontSize: "2rem",
      "@media (min-width:600px)": {
        fontSize: "3.0rem",
      },
    },
    h2: {
      fontWeight: "300",
      fontSize: "2.3rem",
      "@media (min-width:600px)": {
        fontSize: "3.5rem",
      },
    },
    h5: {
      fontSize: "1.0rem",
      "@media (min-width:600px)": {
        fontSize: "1.3rem",
      },
    },
  },
};

export default colorTheme;

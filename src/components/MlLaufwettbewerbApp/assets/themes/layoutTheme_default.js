import "typeface-muli";

const colorTheme = {
  overrides: {
    MuiPaper: {
      root: {
        padding: "10px",
      },
    },
  },
  typography: {
    fontFamily: "Muli",
    h5: {
      fontSize: "1.0rem",
      "@media (min-width:600px)": {
        fontSize: "1.3rem",
      },
    },
  },
};

export default colorTheme;

import { yellow, lime, cyan } from "@material-ui/core/colors";

const colorTheme = {
  map: {
    highway: {
      color: "rgb(0,222,0)",
      opacity: 0.1,
    },
    water: {
      color: "rgb(0,222,0)",
      opacity: 1,
    },
  },
  palette: {
    type: "dark",
    primary: cyan,
    secondary: lime,
    info: yellow,
    background: {
      default: "#222222",
    },
    chart: {
      gridColor: "#444",
    },
  },
};

export default colorTheme;

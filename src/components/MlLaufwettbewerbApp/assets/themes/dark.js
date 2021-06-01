import { yellow, lime, cyan } from "@material-ui/core/colors";

const colorTheme = {
  map: {
    highway: {
      color: "rgb(222,222,222)",
      opacity: 0.1,
    },
    water: {
      color: "#73e8f7",
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

import React from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material";

const theme = createTheme({});

export default function ThemeWrapper(props) {
  return <ThemeProvider theme={theme}>{props?.children}</ThemeProvider>;
}

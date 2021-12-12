import React from "react";

import { MapComponentsProvider } from "@mapcomponents/react-core";
import "./style.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({});

const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <MapComponentsProvider>
        <Story />
      </MapComponentsProvider>
    </ThemeProvider>
  ),
];

export default decorators;

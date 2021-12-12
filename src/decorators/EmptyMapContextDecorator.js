import React from "react";

import { MapComponentsProvider } from "@mapcomponents/react-core";
import { LoadingOverlayProvider } from "../ui_components/LoadingOverlayContext";
import LoadingOverlay from "../ui_components/LoadingOverlay";
import "./style.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({});

const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <MapComponentsProvider>
        <LoadingOverlayProvider>
          <LoadingOverlay></LoadingOverlay>

          <Story />
        </LoadingOverlayProvider>
      </MapComponentsProvider>
    </ThemeProvider>
  ),
];

export default decorators;

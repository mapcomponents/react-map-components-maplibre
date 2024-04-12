import React, { useMemo, ReactElement, FC } from 'react';

import { MapComponentsProvider } from "../index";
import MapLibreMap from "../components/MapLibreMap/MapLibreMap";
import "./style.css";
import MlNavigationTools from "../components/MlNavigationTools/MlNavigationTools";
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import getTheme from '../ui_components/MapcomponentsTheme';
import { Decorator } from '@storybook/react';

interface StoryContext {
  globals: {
    theme?: 'dark' | 'light';
  };
}

const decorators: Decorator[] = [
  (Story: FC, context?: StoryContext): ReactElement => {
    const theme = useMemo(() => getTheme(context?.globals?.theme), [context?.globals?.theme]);

    return (
      <div className="fullscreen_map">
        <MapComponentsProvider>
          <MUIThemeProvider theme={theme}>
            <Story />
            <MapLibreMap
              options={{
                zoom: 14.5,
                style: 'https://wms.wheregroup.com/tileserver/style/osm-bright.json',
                center: [7.0851268, 50.73884],
              }}
              mapId="map_1"
            />
            <MlNavigationTools showZoomButtons={false} mapId="map_1" />
          </MUIThemeProvider>
        </MapComponentsProvider>
      </div>
    );
  },
];

export default decorators;

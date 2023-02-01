import React from "react";

import { themes } from "@storybook/theming";

import "./style.css";

console.log('ReactDOM.render warning is from storybook still using react 17 to render the UI; The components shown are using 18 thoug. See https://github.com/storybookjs/storybook/issues/17831 for more info. The issue will eventually be resolved by upgrading storybook, once it fully supports React 18');

export const parameters = {
  docs: {
    inlineStories: false,
  },
  actions: { argTypesRegex: "^on[A-Z].*" },

  sourceLinkPrefix: 'https://github.com/mapcomponents/react-map-components-maplibre/blob/main/src/'
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    title: 'Theme',
    description: 'Theme for your components',
    defaultValue: 'light',
    toolbar: {
      icon: 'paintbrush',
      dynamicTitle: true,
      items: [
        { value: 'light', left: '☀️', title: 'Light mode' },
        { value: 'dark', left: '🌙', title: 'Dark mode' },
      ],
    },
  },
};
import React from "react";

import { themes } from "@storybook/theming";

import "./style.css";

export const parameters = {
  docs: {
    inlineStories: false,
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
};

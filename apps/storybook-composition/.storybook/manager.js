import { addons } from "storybook/manager-api";
import wheregroupTheme from "./wheregroupTheme";

addons.register('custom-panel', (api) => {
	api.togglePanel(false);
});

addons.setConfig({
	theme: wheregroupTheme,
});

import './style.css';

export const parameters = {
	docs: {
		inlineStories: false,
	},
	actions: { argTypesRegex: '^on[A-Z].*' },

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
export const tags = ['autodocs'];

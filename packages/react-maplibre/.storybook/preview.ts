import './style.css';

const preview = {
	parameters: {
		layout: 'fullscreen',
		docs: {
			story: {
				iframeHeight: 500,
			},
		},
		actions: { argTypesRegex: '^on[A-Z].*' },
	},
	globalTypes: {
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
	},
	tags: ['autodocs'],
};

export default preview;

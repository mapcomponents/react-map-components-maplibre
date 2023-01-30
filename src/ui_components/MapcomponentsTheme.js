import { createTheme } from '@mui/material/styles';

let theme = createTheme({
	palette: {
		primary: {
			main: '#009FE3',
		},
		secondary: {
			main: '#121212',
		},
		background: {
			default: '#4E4B48',
			secondary: '#009FE3',
			paper: '#4E4B48',
		},
		text: {
			primary: '#fff',
			secondary: '#fff',
			third: '#000',
		},
	},

	/*
	palette: {
		primary: {
			main: '#121212',
		},
		secondary: {
			main: '#009FE3',
		},
		background: {
			default: '#4E4B48',
			secondary: '#fff',
			paper: '#4E4B48',
		},
		text: {
			primary: '#fff',
			secondary: '#fff',
			third: '#000',
		},
	},
	palette: {
		primary: {
			main: '#d3d3d3',
		},
		secondary: {
			main: '#009FE3',
		},
		background: {
			default: '#fff',
			secondary: '#4E4B48',
			paper: '#fff',
		},
		text: {
			primary: '#000',
			secondary: '#000',
			third: '#fff',
		},
	},
	*/
});

theme = createTheme(theme, {
	components: {
		MuiIconButton: {
			styleOverrides: {
				root: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.background.default,
					':hover': {
						color: theme.palette.text.third,
						backgroundColor: theme.palette.background.secondary,
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.background.default,
				},
			},
			variants: [
				{
					props: { variant: 'navtools' },
					style: {
						minWidth: '20px',
						minHeight: '20px',
						[theme.breakpoints.down('md')]: {
							width: '50px',
							height: '50px',
							fontSize: '1.4em',
						},
						[theme.breakpoints.up('md')]: {
							width: '30px',
							height: '30px',
							fontSize: '1.2em',
						},
						backgroundColor: theme.palette.background.default,
						borderRadius: '23%',
						//border: "1px solid #bbb",
						//boxShadow: "0px 0px 4px rgba(0,0,0,.5)",
						margin: '0.15px',
						marginTop: '4px',
						':hover': {
							backgroundColor: theme.palette.background.secondary,
							color: theme.palette.text.third,
						},
						color: theme.palette.text.primary,
					},
				},
			],
		},
	},
});

export default theme;

import { createTheme } from '@mui/material/styles';
//import getDesignTokens from 'MapcomponentsThemeColor';
const lightDefault = createTheme({
	palette: {
		mode: 'light',
	},
});
const darkDefault = createTheme({
	palette: {
		mode: 'dark',
	},
});

const getDesignTokens = (mode) => ({
	...(mode === 'light' ? lightDefault : darkDefault),
	palette: {
		mode,
		...(mode === 'light'
			? {
					primary: {
						main: '#009FE3',
					},

					background: {
						default: '#fff',
						paper: '#fff',
					},
					text: {
						primary: '#000',
					},
			  }
			: {
					primary: {
						main: '#009FE3',
					},
					background: {
						default: '#000',
						paper: '#424242',
					},
					text: {},
			  }),
	},
});
const theme = (mode) => {
	const theme = getDesignTokens(mode);

	return createTheme(theme, {
		components: {
			MuiAppBar: {
				styleOverrides: {
					root: {
						backgroundColor: theme.palette.background.default,
					},
				},
			},
			MuiIconButton: {
				styleOverrides: {
					root: {
						color: theme.palette.text.primary,
						backgroundColor: theme.palette.background.paper,
						':hover': {
							backgroundColor: theme.palette.primary.main,
						},
					},
				},
			},
			MuiButton: {
				styleOverrides: {
					backgroundColor: theme.palette.background.paper,
					':hover': {
						backgroundColor: theme.palette.primary.main,
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
							backgroundColor: '#424242',
							borderRadius: '23%',
							//border: "1px solid #bbb",
							//boxShadow: "0px 0px 4px rgba(0,0,0,.5)",
							margin: '0.15px',
							marginTop: '4px',
							':hover': {
								backgroundColor: '#424242',
								color: theme.palette.primary.main,
							},
							color: '#fff',
						},
					},
				],
			},
		},
	});
};

export default theme;

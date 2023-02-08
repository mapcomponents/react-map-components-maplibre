import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/system';

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		navtools: true;
	}
}

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

const getDesignTokens = (mode: 'light' | 'dark') => ({
	...(mode === 'light' ? lightDefault : darkDefault),
	palette: {
		mode,
		...(mode === 'dark'
			? {
					primary: {
						main: '#009FE3',
					},
					background: {
						default: '#222222',
						paper: '#414141',
						icon: '#525252',
					},
					text: {
						secondary: '#fff',
						contrast: '#121212',
					},
			  }
			: {
					primary: {
						main: '#009FE3',
					},

					background: {
						default: '#fff',
						paper: '#fdfdfd',
						icon: '#bdbdbd',
					},
					text: {
						primary: '#111',
						secondary: '#121212',
						contrast: '#fff',
					},
			  }),
	},
});
const getTheme = (mode: 'light' | 'dark') => {
	const theme: Theme = getDesignTokens(mode);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return createTheme(theme, {
		components: {
			MuiTypography: {
				styleOverrides: {
					root: {
					},
				},
			},
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
						backgroundColor: theme.palette.background.icon,
						':hover': {
							backgroundColor: theme.palette.background.icon,
							color: theme.palette.primary.main,
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
							fontWeight: 600,
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
							backgroundColor: theme.palette.background.icon,
							borderRadius: '23%',
							//border: "1px solid #bbb",
							//boxShadow: "0px 0px 4px rgba(0,0,0,.5)",
							margin: '0.15px',
							marginTop: '4px',
							':hover': {
								color: theme.palette.primary.main,
								backgroundColor: theme.palette.background.icon,
							},
							color: theme.palette.text.secondary,
						},
					},
				],
			},
		},
	});
};

export default getTheme;

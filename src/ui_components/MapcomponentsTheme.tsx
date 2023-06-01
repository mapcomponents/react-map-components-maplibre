import { ListItemTextProps } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/system';

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		navtools: true;
	}
}
declare module '@mui/material' {
	export interface ListItemTextProps {
		variant?: 'layerlist';
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
						main: '#009EE0',
					},
					secondary: { main: '#fff' },
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
						main: '#009EE0',
					},
					secondary: { main: '#747577' },

					background: {
						default: '#fff',
						paper: '#fdfdfd',
						icon: '#fff',
					},
					text: {
						primary: '#1A171B',
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
					root: {},
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
					contained: {
						color: '#fff',
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
								backgroundColor: '#f5f5f5',
							},
							color: theme.palette.text.secondary,
						},
					},
				],
			},
			MuiListItemText: {
				styleOverrides: {
					primary: ({ ownerState }: { ownerState: ListItemTextProps }) => {
						if (ownerState?.variant === 'layerlist') {
							return { fontSize: '0.9rem' };
						}
						return {};
					},
					secondary: ({ ownerState }: { ownerState: ListItemTextProps }) => {
						if (ownerState?.variant === 'layerlist') {
							return { fontSize: '0.7rem' };
						}
						return {};
					},
				},
			},
		},
	});
};

export default getTheme;

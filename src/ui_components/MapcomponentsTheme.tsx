import { ListItemTextProps } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/system';

declare module '@mui/material' {
	interface Palette {
		topToolbar: { barColor: string };
		navigation: { navColor: string; navHover: string };
		GPS: { GPSActiveColor: string; GPSInactiveColor: string; GPSActiveBackgroundColor: string };
		compass: {
			compColor: string;
			compHover: string;
			compStroke: string;
			compNorth: string;
			compSouth: string;
		};
	}
}
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
					secondary: { main: '#747577' },
					background: { paper: '#313131' },
					text: {
						primary: '#FFF',
						contrast: '#000',
					},
					topToolbar: { barColor: '#000' },
					navigation: { navColor: '#313131', navHover: '#747577' },
					GPS: {
						GPSActiveColor: '#fff',
						GPSInactiveColor: '#fff',
						GPSActiveBackgroundColor: '#747577',
					},
					compass: {
						compColor: '#313131',
						compHover: '#747577',
						compStroke: '#d3dce1',
						compNorth: '#cf003f',
						compSouth: '#d3dcf0',
					},
			  }
			: {
					primary: {
						main: '#009EE0',
					},
					secondary: { main: '#747577' },
					text: {
						primary: '#000',
						contrast: '#fff',
					},
					topToolbar: { barColor: '#fff' },
					navigation: { navColor: '#fff', navHover: '#f5f5f5' },
					GPS: {
						GPSActiveColor: '#009EE0',
						GPSInactiveColor: '#000',
						GPSActiveBackgroundColor: '#fff',
					},
					compass: {
						compColor: '#fff',
						compHover: '#f5f5f5',
						compStroke: '#009ee0',
						compNorth: '#cf003f',
						compSouth: '#d3dcf0',
					},
			  }),
	},
});
const getTheme = (mode: 'light' | 'dark' | undefined) => {
	const theme: Theme = getDesignTokens(
		mode && ['light', 'dark'].includes(mode as string) ?
		(mode) :
		'light');

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
						backgroundColor: theme.palette.topToolbar.barColor,
					},
				},
			},
			MuiButton: {
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
							color: theme.palette.text.primary,
							backgroundColor: theme.palette.navigation.navColor,
							borderRadius: '23%',
							margin: '0.15px',
							marginTop: '4px',
							':hover': {
								backgroundColor: theme.palette.navigation.navHover,
							},
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

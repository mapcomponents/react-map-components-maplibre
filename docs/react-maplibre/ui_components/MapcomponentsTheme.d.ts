declare module '@mui/material' {
    interface Palette {
        topToolbar: {
            barColor: string;
        };
        navigation: {
            buttonColor: string;
            navColor: string;
            navHover: string;
        };
        GPS: {
            GPSActiveColor: string;
            GPSInactiveColor: string;
            GPSActiveBackgroundColor: string;
        };
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
    interface ListItemTextProps {
        variant?: 'layerlist';
    }
}
declare const getTheme: (mode: "light" | "dark" | undefined) => import('@mui/material').Theme;
export default getTheme;
//# sourceMappingURL=MapcomponentsTheme.d.ts.map
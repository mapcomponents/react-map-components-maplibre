import React, { ReactNode, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';


export default function ThemeWrapper(props: { children: ReactNode, context: unknown }) {
	console.log(props.context?.globals?.theme);
	
	const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: props.context?.globals?.theme ? props.context?.globals?.theme:'light',
        }
      }),
    [props?.context?.globals?.theme]
  );


	return <MUIThemeProvider theme={theme}>{props?.children}</MUIThemeProvider>;
}

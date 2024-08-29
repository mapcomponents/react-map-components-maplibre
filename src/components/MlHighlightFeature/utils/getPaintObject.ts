import { useState } from "react";
import getTheme from "../../../ui_components/MapcomponentsTheme";

export default function(geomType: string, variant: string){

	const [paint, setPaint] = useState<any>();
	const theme = getTheme("light");
	const defaultColor = theme.palette.primary.main;

	switch (geomType) {
		case 'Polygon':
			if (variant == "dark"){
				setPaint({ 'fill-color': "#555555", "fill-opacity": 0.5});
			} 
			if (variant == "hell"){
				setPaint({ 'line-color': defaultColor, });
			} 
			if (variant == "outlined"){
				setPaint({ 'line-color': defaultColor, });
			} 
			
			break;

		case 'LineString':
			setPaint({ 'line-color': defaultColor});
		
			break;

		case 'Point':
			setPaint({
				'circle-stroke-color': defaultColor,
				'circle-opacity': 0,				
			});

			break;
		}

	return paint;
	}

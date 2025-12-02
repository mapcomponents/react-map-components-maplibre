import { MapComponentsProvider } from '@mapcomponents/react-maplibre';
import GeospatialInputMap, { GeospatialInputMapProps } from './GeospatialInputMap.js';

function GeospatialInput(props: GeospatialInputMapProps) {
	return (
		<>
			{props.embeddedMap ? (
				<MapComponentsProvider>
					<GeospatialInputMap {...props} />
				</MapComponentsProvider>
			) : (
				<GeospatialInputMap {...props} />
			)}
		</>
	);
}
GeospatialInput.defaultProps = {
	embeddedMap: true,
};

export default GeospatialInput;

import { MapComponentsProvider } from '@mapcomponents/react-maplibre';
import GeometryShowMap, { GeospatialShowMapProps } from './GeospatialShowMap.js';

function GeospatialShow(props: GeospatialShowMapProps) {
	return (
		<>
			{props.embeddedMap ? (
				<MapComponentsProvider>
					<GeometryShowMap {...props} />
				</MapComponentsProvider>
			) : (
				<GeometryShowMap {...props} />
			)}
		</>
	);
}
GeospatialShow.defaultProps = {
	embeddedMap: true,
};

export default GeospatialShow;

import React, { useEffect } from 'react';
import MlGeoJsonLayer from '../MlGeoJsonLayer';
import { MlGeoJsonLayerProps } from '../MlGeoJsonLayer';
import useMap from '../../../hooks/useMap';

const HeatMapStyler = (props: MlGeoJsonLayerProps) => {
	const mapHook = useMap({ mapId: 'map_1' });

	useEffect(() => {
		mapHook.map?.map.setCenter([7.099301807798469, 50.734214410085684]);
		mapHook.map?.map.setZoom(3);
	}, [mapHook.map]);

	return <MlGeoJsonLayer {...props} />;
};

export default HeatMapStyler;

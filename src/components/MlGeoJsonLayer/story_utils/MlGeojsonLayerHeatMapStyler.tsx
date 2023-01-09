import React from 'react';
import MlGeoJsonLayer from '../MlGeoJsonLayer';
import { MlGeoJsonLayerProps } from '../MlGeoJsonLayer';

const HeatMapStyler = (props: MlGeoJsonLayerProps) => {

	return <MlGeoJsonLayer {...props} />;
};

export default HeatMapStyler;

import React from 'react';
import MlGeoJsonLayer from '../MlGeoJsonLayer';
import { MlGeoJsonLayerProps } from '../MlGeoJsonLayer';

const CircleMapStyler = (props: MlGeoJsonLayerProps) => {
	return <MlGeoJsonLayer {...props} />;
};

export default CircleMapStyler;

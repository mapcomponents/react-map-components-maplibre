import React from 'react';
import { layerRemovalTest } from '../../util';

import { uuid_regex } from '../../setupTests';
import MlFillExtrusionLayer from './MlFillExtrusionLayer';
import useSource from '../../hooks/useSource';

const TestComponent = () => {
	useSource({
		sourceId: 'openmaptiles',
		source: {
			type: 'geojson',
			data: {
				type: 'geojson',
				data: {
					type: 'Feature',
					geometry: { type: 'Point', coordinates: [-1.237149629741907, 43.162495130673051] },
					properties: { id: 123 },
				},
			},
		},
	});

	return <MlFillExtrusionLayer />;
};

const testComponentWrapper = <TestComponent />;

let testParams = [
	'<MlFillExtrusionLayer />',
	testComponentWrapper,
	new RegExp('^.*"MlFillExtrusionLayer-' + uuid_regex + '".*$'),
	'MlFillExtrusionLayer-{uuid}',
];

layerRemovalTest(...testParams);

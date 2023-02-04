import { layerRemovalTest, sourceRemovalTest } from '../../util';
import { uuid_regex } from '../../setupTests';

import MlImageMarkerLayer from './MlImageMarkerLayer';

const testComponent = (
	// eslint-disable-next-line react/react-in-jsx-scope
	<MlImageMarkerLayer
		options={{
			source: {
				type: 'geojson',
				data: {
					type: 'Feature',
					properties: {
						id: 'test',
					},
					geometry: {
						type: 'Point',
						coordinates: [7.0847929969609424, 50.73855193187643],
					},
				},
			},
		}}
	/>
);

layerRemovalTest(
	'<MlImageMarkerLayer />',
	testComponent,
	new RegExp('^.*"MlImageMarkerLayer-' + uuid_regex + '".*$'),
	'MlImageMarkerLayer-{uuid}'
);
sourceRemovalTest(
	'<MlImageMarkerLayer />',
	testComponent,
	new RegExp('^.*"MlImageMarkerLayer-' + uuid_regex + '".*$'),
	'MlImageMarkerLayer-{uuid}'
);

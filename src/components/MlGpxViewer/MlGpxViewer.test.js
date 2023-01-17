import { layerRemovalTest, sourceRemovalTest } from '../../util';

import MlGpxViewer from './MlGpxViewer';
import { uuid_regex } from '../../setupTests';

const gpxSample = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<gpx version="1.1" creator="outdooractive - http://www.outdooractive.com" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" xmlns:oa="http://www.outdooractive.com/GPX/Extensions/1">
	<metadata>
		<name>Traumpfad Bergheidenweg</name>
		<author>
			<name>Nicole Pfeifer - Rhein-Mosel-Eifel-Touristik</name>
		</author>
		<link href="https://www.outdooractive.com/r/1386783"/>
		<time>2021-04-08T13:53:11.658</time>
		<extensions>
			<oa:oaCategory>hikingTourTrail</oa:oaCategory>
		</extensions>
	</metadata>
	<wpt lon="7.07093" lat="50.369418">
		<ele>423</ele>
		<name>HausAcht - Tagungs- und Freizeithaus</name>
		<desc></desc>
		<src>feratel-eifel.21430.e4c23207-9b3e-47bc-a359-730147d57644</src>
		<link href="https://www.HausAcht.de"/>
		<type>Ferienwohnung</type>
	</wpt>
</gpx>`;

// eslint-disable-next-line react/react-in-jsx-scope
const testComponent = <MlGpxViewer gpxData={gpxSample} />;

let sourceTestParams = [
	'<MlGpxViewer />',
	testComponent,
	new RegExp('^.*"gpx-viewer-source-' + uuid_regex + '".*$'),
	'gpx-viewer-source',
];
let layer1TestParams = [
	'<MlGpxViewer />',
	testComponent,
	new RegExp('^.*"importer-layer-lines-' + uuid_regex + '".*$'),
	'importer-layer-lines',
];
let layer2TestParams = [
	'<MlGpxViewer />',
	testComponent,
	new RegExp('^.*"importer-layer-points-' + uuid_regex + '".*$'),
	'importer-layer-points',
];

layerRemovalTest(...layer1TestParams);
layerRemovalTest(...layer2TestParams);
sourceRemovalTest(...sourceTestParams);

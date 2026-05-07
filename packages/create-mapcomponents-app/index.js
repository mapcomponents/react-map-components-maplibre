#!/usr/bin/env node

import degit from 'degit';
const path = process.argv[2] || 'my-mapcomponents-app';

const emitter = degit('mapcomponents/react-map-components-maplibre/tree/main/apps/template');
emitter.clone(path).then(() => {
	console.log(`Project cloned to ${path}`);
});

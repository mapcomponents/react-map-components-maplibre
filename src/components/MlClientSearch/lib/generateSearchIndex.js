// Create a search index with elasticlunr
// Example data from: https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-500

import * as fs from 'fs';
import * as elasticlunr from 'elasticlunr';

const geoJsonSources = ['cities.geojson'];
const searchIndex = elasticlunr(function () {
	this.setRef('ID');
	this.addField('CITY');
	this.addField('POPULATION');
	// this.addField('COORDINATES');  Notice: COORDINATES is not added as a searchable field here
	this.saveDocument(true); // Make sure this is true to save all document data
});

const processData = (source) => {
	const data = fs.readFileSync(`./${source}`);
	const raw = JSON.parse(data);

	const features = raw.features.map((feature) => {
		const data = {
			source: source,
		};
		data.ID = feature.properties.geoname_id;
		data.CITY = feature.properties.name;
		data.POPULATION = feature.properties.population;
		data.COORDINATES = feature.geometry.coordinates; //  Notice: COORDINATES is added here

		return data;
	});

	features.forEach((feature) => {
		searchIndex.addDoc(feature);
	});
};

Promise.all(geoJsonSources.map(processData)).then(() => {
	console.log(searchIndex);

	fs.writeFile('./searchIndex.json', JSON.stringify(searchIndex), (err) => {
		if (err) throw err;
		console.log('Search index generated.');
	});
});

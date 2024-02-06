import initSqlJs from 'sql.js';
import * as pako from 'pako';
import { RequestParameters} from 'maplibre-gl';

const loadedMbtiles = {};

const parseTileParams = (url: string) => {
	const urlParts = url.split('://');
	const mbtilesUrl = urlParts.length > 2 ? urlParts[1] + '://' + urlParts[2] : urlParts[1];
	const mbtilesParts = mbtilesUrl.split('/');
	const mbtilesPartsLength = mbtilesParts.length;
	const y = mbtilesParts.splice(mbtilesPartsLength - 1, 1)[0];
	const x = mbtilesParts.splice(mbtilesPartsLength - 2, 1)[0];
	const z = mbtilesParts.splice(mbtilesPartsLength - 3, 1)[0];
	const filename = mbtilesParts.join('/');

	return {
		filename,
		z,
		x,
		y,
	};
};

// mbtiles files are sqlite databases. This function loads the database and returns a handler
// to work with sqlite databases in javascript we need to use sql.js.
// to make this work in your project make sure to copy sql-wasm.wasm to the file root of your public folder and
// add the following config to the externals prop of your webpack config
// {externals: { fs: 'fs' }};
const getMbtilesDbHandler = async ({ filename }: { filename: string }) => {
	if (!loadedMbtiles[filename]) {
		const SQL = await initSqlJs();
		const fetched = await fetch(filename);
		const buf = await fetched.arrayBuffer();
		const db = new SQL.Database(new Uint8Array(buf));
		loadedMbtiles[filename] = db;
	}
	return loadedMbtiles[filename];
};

/**
 * Example usage:
 * getBufferFromMbtiles({ filename: 'mbtiles/countries.mbtiles', z: '0', x: '0', y: '0' }).then(
 * 	(result) => {
 * 		console.log(result);
 * 	}
 * );
 */
async function getBufferFromMbtiles(params: { filename: string; z: string; x: string; y: string }) {
	const db = await getMbtilesDbHandler(params);
	const query =
		'SELECT tile_data FROM tiles WHERE zoom_level = ' +
		params.z +
		' AND tile_column = ' +
		params.x +
		' AND tile_row = ' +
		(Math.pow(2, parseInt(params.z)) - parseInt(params.y) - 1);
	return new Promise((resolve, reject) => {
		try {
			// some of the logic here was heavily inspired by
			// https://github.com/IsraelHikingMap/Site/blob/6aa2ec0cfb8891fa048b1d9e2a4fc7d4cbcc8c97/IsraelHiking.Web/src/application/services/database.service.ts
			const result = db.exec(query);

			if (result.length !== 1) {
				reject(new Error('Tile not found.'));
				return;
			}
			const resultData = result[0].values[0][0] as Uint8Array;

			let binData: Uint8Array;
			const isGzipped = resultData[0] === 0x1f && resultData[1] === 0x8b;
			if (isGzipped) {
				binData = pako.inflate(resultData);
			} else {
				binData = resultData;
			}
			if (binData?.buffer) {
				resolve(binData.buffer);
			} else {
				reject(new Error('Tile not found.'));
				return;
			}
		} catch (error) {
			reject(error);
		}
	});
}

/**
 * Expects a tile url in the following format:
 *
 * 'mbtiles://mbtiles/countries.mbtiles/{z}/{x}/{y}'
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mbTilesProtocolHandler = async (params: RequestParameters) => {
	const parsedParams = parseTileParams(params.url);
	const data = await getBufferFromMbtiles(parsedParams);
	if (data) {
		return { data: data };
	}
	throw new Error('Tile not found' + parsedParams.filename);
};

export { mbTilesProtocolHandler, parseTileParams, getBufferFromMbtiles, getMbtilesDbHandler };

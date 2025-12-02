const glob = require('glob');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const Ajv = require('ajv');
const ajv = new Ajv();
const fs = require('fs');

const options = {};
const mc_meta = {};

glob('src/**/**/*.meta.json', options, function (er, files) {
	console.log(files);

	// eslint-disable-next-line prefer-const
	let i = 0,
		len = files.length;
	for (; i < len; i++) {
		const rawdata = fs.readFileSync(files[i]);
		const metaObj = JSON.parse(rawdata);
		mc_meta[metaObj.name] = metaObj;
	}

	fetch('https://catalogue.mapcomponents.org/schema/metadata.schema.json', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((res) => {
			if (!res.ok) {
				return false;
			} else {
				return res.json();
			}
		})
		.then((schema) => {
			const validate = ajv.compile(schema);
			const valid = validate(mc_meta);
			if (!valid) throw new Error(JSON.stringify(validate.errors));
			//if (!valid) console.log(validate.errors);

			const data = JSON.stringify(mc_meta);
			fs.writeFileSync('public/catalogue/mc_meta.json', data);
		});
});

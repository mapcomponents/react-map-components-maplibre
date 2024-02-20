const { glob } = require('glob');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const Ajv = require('ajv');
const ajv = new Ajv();
const fs = require('fs');

let options = {};
let mc_meta = {};

glob('src/**/**/*.meta.json', options).then(function (files) {
	console.log(files);

	for (var i = 0, len = files.length; i < len; i++) {
		let rawdata = fs.readFileSync(files[i]);
		let metaObj = JSON.parse(rawdata);
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

			let data = JSON.stringify(mc_meta);
			fs.writeFileSync('public/catalogue/mc_meta.json', data);
		});
});

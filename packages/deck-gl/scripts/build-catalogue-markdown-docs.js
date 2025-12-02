const glob = require('glob');
const fs = require('fs');
const showdown = require('showdown');

const options = {};

function getComponentNameFromPath(path) {
	let tmp = path.split('/');
	tmp = tmp[tmp.length - 1];
	tmp = tmp.split('.doc');
	return tmp[0];
}

const converter = new showdown.Converter();

glob('src/components/**/*.doc.*.md', options, function (er, files) {
	console.log(files);

	// eslint-disable-next-line prefer-const
	let i = 0,
		len = files.length;
	for (; i < len; i++) {
		const language = files[i].slice(-5, -3);
		const rawdata = fs.readFileSync(files[i]);
		const html = converter.makeHtml(rawdata + '');
		fs.writeFileSync(
			'public/catalogue/' + getComponentNameFromPath(files[i]) + '.' + language + '.html',
			html
		);
	}
});

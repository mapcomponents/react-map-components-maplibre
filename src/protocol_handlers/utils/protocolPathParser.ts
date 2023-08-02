
export default function protocolPathParser(url: string){
	const test = url.split('?')
	const urlParts = test[0].split('://');
    const protocolId = urlParts[0];
	const csvUrl = urlParts[1];
	const csvParts = csvUrl.split('/');
	const filename = csvParts.join('/');

	const optionsString = decodeURI(test[1]);
	const options = Object.fromEntries(new URLSearchParams(optionsString))

	console.log("option form parser: ", options)
	return {
        protocolId,
		filename,
		options,
	};
};
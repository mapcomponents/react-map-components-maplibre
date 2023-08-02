
export default function protocolPathParser(url: string){
	const urlParts = url.split('://');
    const protocolId = urlParts[0];
	const csvUrl = urlParts[1];
	const csvParts = csvUrl.split('/');
	const filename = csvParts.join('/');

	return {
        protocolId,
		filename,
	};
};
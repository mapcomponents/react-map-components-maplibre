
export default async function getProtocolData(path: string) {
	try {

		const response = await fetch(path);
		const rawData = await response.text();
		
		return rawData;
	} catch (error) {
		console.error('File could not be loaded: ', error);
		return error;
	}
//}
	
}
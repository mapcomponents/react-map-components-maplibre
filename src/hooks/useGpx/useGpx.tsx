import { useState, useEffect } from 'react';
import toGeoJSON from './lib/gpxConverter';
import { FeatureCollection } from 'geojson';

export interface useGpxProps {
	/**
	 * a string containing GPX data that is supposed to be parsed and converted to GeoJSON by this hook
	 */
	data?: string;
}

export interface MetadataType {
	title: string;
	value: string;
	id: number;
}

/**
 * useGpx hook converts GPX data to GeoJSON
 *
 */
const useGpx = (props: useGpxProps) => {
	const [geojson, setGeojson] = useState<FeatureCollection | undefined>();
	const [metadata, setMetadata] = useState<MetadataType[]>([]);

	const parseGpx = (gpxAsString: string) => {
		try {
			setMetadata([]);
			const domParser = new DOMParser();
			const gpxDoc = domParser.parseFromString(gpxAsString, 'application/xml');
			const metadata = gpxDoc.querySelector('metadata');
			metadata?.childNodes.forEach((node: Element) => {
				let value = node.textContent;
				const title = node.nodeName;

				if (node.nodeName === 'link') {
					value = node.getAttribute('href');
				}
				if (value?.trim().length) {
					const metaDataEntry = {
						title: title,
						value: value,
						id: new Date().getTime(),
					};
					setMetadata((prevState) => [...prevState, metaDataEntry]);
				}
			});
			const data = toGeoJSON.gpx(gpxDoc);
			setGeojson(data as FeatureCollection);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (!props.data) return;

		parseGpx(props.data);
	}, [props.data]);

	return {
		geojson,
		metadata,
	};
};

useGpx.defaultProps = {
	data: undefined,
};
export default useGpx;

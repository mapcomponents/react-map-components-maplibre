import React, { useState, useEffect } from 'react';
import elasticlunr from 'elasticlunr';
import { SearchContextInterface } from './searchContext.js';
import * as turf from '@turf/turf';
import useMap from '../../../hooks/useMap';
import MlGeoJsonLayer from '../../MlGeoJsonLayer/MlGeoJsonLayer';
import { createGeoJSONFeature } from './createGeojsonFeature';
import { Coordinates, LngLatBoundsLike } from 'maplibre-gl';
import {Feature, BBox} from 'geojson';

interface SearchContextProviderProps {
	children: React.ReactNode;
	searchIndex: SearchContextInterface['searchIndex'];
	fields: SearchContextInterface['fields'];
	renderOption?: SearchContextInterface['renderOption'];
	searchFieldLabel?: SearchContextInterface['searchFieldLabel'];
}

const SearchContext = React.createContext<SearchContextInterface>({} as SearchContextInterface);

const SearchContextProvider: React.FC<SearchContextProviderProps> = ({
	children,
	searchIndex,
	renderOption,
	searchFieldLabel,
	fields,
}) => {
	const [searchIndexInstance, setSearchIndexInstance] = useState<any | undefined>(undefined);
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
	const [searchResults, setSearchResults] = useState<string[]>([]);
	const [searchResultsArray, setSearchResultsArray] = useState<string[]>([]);
	const [selectedResult, setSelectedResult] = useState<string | object | undefined>(undefined);
	const [feature, setFeature] = useState<Feature>();

	const mapHook = useMap({
		mapId: undefined,
	});

	useEffect(() => {
		setSearchIndexInstance(elasticlunr.Index.load(searchIndex));
	}, [searchIndex]);

	const getBoundingBox = (geometry: any): BBox => {
		if (geometry.geometry.coordinates?.length === 2) {
			geometry = turf.buffer(geometry, 1, {
				units: 'kilometers',
			});
		}
		return turf.bbox(geometry);
	};

	useEffect(() => {
		if (searchTerm && searchIndexInstance) {
			const results = searchIndexInstance.search(searchTerm.toString(), { fields });
			const maxResults = 10;

			const resultsLimited = results
				.filter((result: any) => result !== undefined)
				.slice(0, maxResults)
				.map((result: any) => {
					const propertyNames = Object.keys(fields);
					propertyNames.forEach(() => {
						if (searchIndexInstance.documentStore.getDoc(result.ref)) {
							result = searchIndexInstance.documentStore.getDoc(result.ref);
						}
					});
					return result;
				});
			setSearchResults(resultsLimited);
		}
	}, [searchTerm, searchIndexInstance, fields]);

	useEffect(() => {
		if (selectedResult && mapHook.map) {
			if (typeof selectedResult === 'object' && 'COORDINATES' in selectedResult) {
				const createdFeature = createGeoJSONFeature(selectedResult.COORDINATES as Coordinates);
				const bbox = getBoundingBox(createdFeature);
				setFeature(createdFeature);
				mapHook.map.fitBounds(bbox as LngLatBoundsLike);
			}
		}
	}, [selectedResult, mapHook.map]);

	const value = {
		searchTerm,
		setSearchTerm,
		searchResults,
		setSearchResults,
		searchResultsArray,
		setSearchResultsArray,
		selectedResult,
		setSelectedResult,
		searchIndex,
		fields,
		searchIndexInstance,
		renderOption,
		searchFieldLabel,
	};

	return (
		<>
			<SearchContext.Provider value={value}> {children}</SearchContext.Provider>
			{feature && <MlGeoJsonLayer geojson={feature} />}
		</>
	);
};

export { SearchContextProvider };
export default SearchContext;

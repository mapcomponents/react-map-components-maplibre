import React, { useContext, useCallback } from 'react';

import SearchContext from './SearchContext';
import { TextField, Autocomplete } from '@mui/material';

function debounce(func: (e: React.ChangeEvent<HTMLInputElement>) => void, wait: number) {
	let timeout: NodeJS.Timeout;

	return function executedFunction(e: React.ChangeEvent<HTMLInputElement>) {
		const later = () => {
			clearTimeout(timeout);
			func(e);
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

export default function SearchForm() {
	const searchContext = useContext(SearchContext);

	function formatObjectProperties(input: string | object | null | undefined): string {
		if (!input) return '';
		if (typeof input === 'object') {
			return processObject(input);
		}
		if (
			typeof input === 'string' &&
			(input.trim().startsWith('{') || input.trim().startsWith('['))
		) {
			try {
				const parsed = JSON.parse(input);
				if (Array.isArray(parsed)) {
					return parsed.map(processObject).join('; ');
				} else {
					return processObject(parsed);
				}
			} catch (error) {
				console.error('Error parsing JSON:', error);
				return '';
			}
		} else if (typeof input === 'string') {
			return input;
		}
		console.error('Invalid input type.');
		return '';
	}

	function processObject(obj: object): string {
		const keys = searchContext.searchIndex.fields;
		const filteredKeys = Object.keys(obj).filter((key) => keys.includes(key));
		return filteredKeys.map((key) => obj[key]).join(', ');
	}
	const debouncedHandleInput = useCallback(
		debounce((e: React.ChangeEvent<HTMLInputElement>) => {
			searchContext.setSearchTerm(e.target.value);
		}, 200),
		[searchContext]
	);

	return (
		<>
			<Autocomplete
				options={searchContext?.searchResults || []}
				noOptionsText="Keine Optionen verfügbar."
				onSelect={debouncedHandleInput}
				value={formatObjectProperties(searchContext?.selectedResult) || null}
				isOptionEqualToValue={(option) => option === searchContext?.selectedResult}
				getOptionLabel={(option) => formatObjectProperties(option)}
				onChange={(_, newValue) => {
					searchContext?.setSelectedResult(newValue ?? undefined);
				}}
				renderOption={searchContext?.renderOption}
				sx={{ width: 250 }}
				renderInput={(params: any) => {
					return <TextField {...params} label={searchContext?.searchFieldLabel} />;
				}}
			/>
		</>
	);
}

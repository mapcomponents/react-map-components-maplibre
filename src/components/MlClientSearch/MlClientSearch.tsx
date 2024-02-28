import React from 'react';
import { SearchContextProvider } from './lib/SearchContext';
import SearchForm from './lib/SearchForm';
import { SearchContextInterface } from './lib/searchContext';

interface MlClientSearchProps {
	/**
	 * Search Engine: http://elasticlunr.com/
	 */
	searchIndex: SearchContextInterface['searchIndex'];
	/**
	 * Docs: http://elasticlunr.com/docs/configuration.js.html
	 */
	fields: SearchContextInterface['fields'];
	/**
	 * Docs: 	https://mui.com/material-ui/api/autocomplete/
	 */
	renderOption?: SearchContextInterface['renderOption'];
}

export type { MlClientSearchProps };

/**
 * Component template
 *
 */

const MlClientSearch = ({ searchIndex, fields, renderOption }: MlClientSearchProps) => {
	return (
		<>
			<SearchContextProvider searchIndex={searchIndex} fields={fields} renderOption={renderOption}>
				<SearchForm />
			</SearchContextProvider>
		</>
	);
};

MlClientSearch.defaultProps = {};
export default MlClientSearch;

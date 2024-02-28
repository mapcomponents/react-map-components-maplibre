export interface SearchContextInterface {
	searchTerm: string | undefined;
	setSearchTerm: (term: string | undefined) => void;
	searchResults: string[] | null;
	fields: { [key: string]: any };
	setSearchResults: (results: string[]) => void;
	selectedResult: string | object | null | undefined;
	setSelectedResult: (term: string | undefined) => void;
	renderOption:
		| ((
				props: React.HTMLAttributes<HTMLLIElement>,
				option: string,
				state: AutocompleteRenderOptionState
		  ) => React.ReactNode)
		| undefined;
	searchFieldLabel: string | undefined;
	searchIndex: any;
}

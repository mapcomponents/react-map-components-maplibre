import React, {useContext} from 'react';
import SimpleDataContext from './SimpleDataContext';
import SimpleDataProvider from './SimpleDataProvider';
import {	waitFor, render, screen } from '@testing-library/react';
import * as d3 from "d3";


jest.mock('d3');


const SimpleDataContextTestComponent = () => {

	const simpleDataContext = useContext(SimpleDataContext);

	return <>
		<div className="data"
		data-testid="data"
		>{JSON.stringify(simpleDataContext.data)}</div>
	</>;
}

const mockData = {id:12,title:'Testtitle'};
const nestedMockData = {data:mockData};
const xmlMockData = (new DOMParser()).parseFromString('<?xml version="1.0" encoding="UTF-8" ?><records>	<record>		<id>1</id>		<title>Macey, Josephine, Robert, Clark</title>	</record>	<record>		<id>2</id>		<title>Summer, Channing, Colette, Josephine</title>	</record></records>',"text/xml");;

describe('SimpleDataProvider',() => {

	it('should retrieve data and provide it through simpleDataContext.data (format: "csv")', async () => {
		d3.csv.mockResolvedValue(mockData);

		render(<SimpleDataProvider format="csv" url="test"><SimpleDataContextTestComponent /></SimpleDataProvider>);

		await waitFor(() => expect(d3.csv).toHaveBeenCalledTimes(1))

		await waitFor(() => expect(screen.getByTestId('data').textContent).toEqual(JSON.stringify(mockData)));
	});

	it('should retrieve data and provide it through simpleDataContext.data (format: "xml")', async () => {
		d3.xml.mockResolvedValue(xmlMockData);

		render(<SimpleDataProvider format="xml" nodeType="record" formatData={(record) => { return {id:record.querySelector('id').innerHTML,title:record.querySelector('title').innerHTML}}} url="test"><SimpleDataContextTestComponent /></SimpleDataProvider>);

		await waitFor(() => expect(d3.xml).toHaveBeenCalledTimes(1))

		await waitFor(() => expect(screen.getByTestId('data').textContent).toEqual('[{"id":"1","title":"Macey, Josephine, Robert, Clark"},{"id":"2","title":"Summer, Channing, Colette, Josephine"}]'))
	});

	it('should retrieve data and provide it through simpleDataContext.data (format: "json")', async () => {
		d3.json.mockResolvedValue(mockData);

		render(<SimpleDataProvider format="json" url="test"><SimpleDataContextTestComponent /></SimpleDataProvider>);

		await waitFor(() => expect(d3.json).toHaveBeenCalledTimes(1))

		await waitFor(() => expect(screen.getByTestId('data').textContent).toEqual(JSON.stringify(mockData)));
	});

	it('should retrieve data and provide the content of the key props.dataProperty on the retrieved data through simpleDataContext.data (format: "json")', async () => {
		d3.json.mockResolvedValue(nestedMockData);

		render(<SimpleDataProvider format="json" data_property="data" url="test"><SimpleDataContextTestComponent /></SimpleDataProvider>);

		await waitFor(() => expect(d3.json).toHaveBeenCalledTimes(1))

		await waitFor(() => expect(screen.getByTestId('data').textContent).toEqual(JSON.stringify(mockData)));
	});


});

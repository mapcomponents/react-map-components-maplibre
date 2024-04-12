import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SimpleDataContextProvider } from "./SimpleDataContext";
import * as d3 from "d3";


export interface SimpleDataProviderProps{
url: string;
format: 'json' | 'csv' | 'xml';
nodeType:string;
data_property:string;
formatData?:(data:any) => any;
onData: () => void;
children: React.ReactNode
}

const SimpleDataProvider = (props:SimpleDataProviderProps) => {
	const [data, setData] = useState<any[] | undefined>();
	useEffect(() => {
		if (!props.url) return;

		let data_promise = null;
		if (props.format === "json") {
			data_promise = d3.json(props.url);
		} else if (props.format === "csv") {
			data_promise = d3.csv(props.url);
		} else if (props.format === "xml") {
			data_promise = d3.xml(props.url);
		}

		if (data_promise) {
			data_promise.then((received_data) => {
				if (props.format === "xml") {
					if (props.nodeType) {
						const dataTmp:any[] = [];
						(received_data as XMLDocument).querySelectorAll(props.nodeType).forEach((el) => {

					if (typeof props.formatData === "function") {
							dataTmp.push(props.formatData(el));
					}
						});
						setData(dataTmp);
					}
				} else {
					let dataTmp:any[] = received_data as any[];
					if (props.data_property) {
						dataTmp = (received_data as any)[props.data_property] as any[];
					}
					if (typeof props.formatData === "function") {
						setData(dataTmp.map(props.formatData));
					} else {
						setData(dataTmp);
					}
				}
				if (typeof props.onData === "function") {
					props.onData();
				}
			});
		}
	}, [props.url, props]);

	const value = {
		data: data,
		setData: setData,
	};

	return (
		<SimpleDataContextProvider value={value}>
			{props.children}
		</SimpleDataContextProvider>
	);
};

SimpleDataProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default SimpleDataProvider;

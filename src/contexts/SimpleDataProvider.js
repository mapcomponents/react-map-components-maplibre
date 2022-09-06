import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SimpleDataContextProvider } from "./SimpleDataContext";
import * as d3 from "d3";

const SimpleDataProvider = (props) => {
	const [data, setData] = useState(null);
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
						let dataTmp = [];
						received_data.querySelectorAll(props.nodeType).forEach((el) => {

							dataTmp.push(props.formatData(el));
						});
						setData(dataTmp);
					}
				} else {
					if (props.data_property) {
						received_data = received_data[props.data_property];
					}
					if (typeof props.formatData === "function") {
						setData(received_data.map(props.formatData));
					} else {
						setData(received_data);
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

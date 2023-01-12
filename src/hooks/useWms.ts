import { useState, useEffect } from "react";
import WMSCapabilities, { WMSCapabilitiesJSON } from "wms-capabilities";

export interface useWmsProps{
	url?:string;
	urlParameters?:{[key: string]: string};
}

export interface useWmsReturnType{
		capabilities:WMSCapabilitiesJSON | null | undefined;
		getFeatureInfoUrl:string | undefined;
		wmsUrl:string | undefined;
		error:string | undefined;
		setUrl:(value:string|undefined) => void;
}

function useWms(props:useWmsProps):useWmsReturnType {
	// Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
	const [getFeatureInfoUrl, setGetFeatureInfoUrl] = useState<string>();
	const [url, setUrl] = useState(props.url);
	const [wmsUrl, setWmsUrl] = useState("");
	const [capabilities, setCapabilities] = useState<WMSCapabilitiesJSON | null | undefined>();
	const [error, setError] = useState();

	const clearState = () => {
		setGetFeatureInfoUrl(undefined);
		setCapabilities(undefined);
		//setLayers([]);
		setWmsUrl("");
	};

	useEffect(() => {
		// extract URL parameters from the given URL
		clearState();
		setError(undefined);

		if (!url) return;

		let _propsUrlParams;
		let _wmsUrl = url;
		if (url.indexOf("?") !== -1) {
			_propsUrlParams = url.split("?");
			_wmsUrl = _propsUrlParams[0];
		}
		const _urlParamsFromUrl = new URLSearchParams(_propsUrlParams?.[1]);

		const urlParamsObj = {
			...Object.fromEntries(_urlParamsFromUrl),
			...props.urlParameters,
		};
		// create URLSearchParams object to assemble the URL Parameters
		const urlParams = new URLSearchParams(urlParamsObj);

		const urlParamsStr =
			decodeURIComponent(urlParams.toString()) + "".replace(/%2F/g, "/").replace(/%3A/g, ":");

		fetch(_wmsUrl + "?" + urlParamsStr)
			.then((res) => {
				if (!res.ok) {
					throw Error(res.statusText + " (" + res.status + " - " + res.type + ")");
				} else {
					return res.text();
				}
			})
			.then((data:string) => {
				setCapabilities(new WMSCapabilities(data, window.DOMParser).toJSON());
			})
			.catch((error) => {
				//reset local state
				clearState();
				console.log(error);
				setError(error.message);
			});
	}, [url, props.urlParameters]);

	useEffect(() => {
		if (!capabilities?.Service) return;

		setWmsUrl(capabilities.Capability?.Request?.GetMap?.DCPType?.[0]?.HTTP?.Get?.OnlineResource);
		// set getFeatureInfo url
		setGetFeatureInfoUrl(
			capabilities.Capability?.Request?.GetFeatureInfo?.DCPType?.[0]?.HTTP?.Get?.OnlineResource
		);
	}, [capabilities]);

	return {
		capabilities,
		getFeatureInfoUrl,
		wmsUrl,
		error,
		setUrl,
	};
}

useWms.defaultProps = {
	url: "",
	urlParameters: {
		SERVICE: "WMS",
		VERSION: "1.3.0",
		REQUEST: "GetCapabilities",
	},
};

export default useWms;

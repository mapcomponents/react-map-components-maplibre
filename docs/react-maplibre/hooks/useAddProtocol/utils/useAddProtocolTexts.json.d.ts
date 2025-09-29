declare const _default: [
	{
		"item": "mbtiles",
		"description": "In this example, an MBtile file containing the countries of the world is loaded to the map through the useAddProtocol hook. The protocol manager registers the contents of the file as a source. We then add in the layer list a Vector tile layer that uses that source. <br> See source file: <a href='https://github.com/mapcomponents/react-map-components-maplibre/blob/main/public/mbtiles/countries.mbtiles' target=”_blank”> countries.mbtiles </a>"
	},
	{
		"item": "csv",
		"description": "<p>The CSVProtocolHandler enables us to load a layer from a table containing the coordinates of one or more points. The table must have a 'latitude' and a 'longitude' column. Column names like 'lat' or 'long' are automatically recognized by the hook. Other names, as well as a delimiter other than the comma, can be specified in the options.This encoded options object can be added after a '?' sign at the end of the url. <br> The url is expected to have the following Format: <br> See source file: <a href='https://github.com/mapcomponents/react-map-components-maplibre/blob/main/public/csv/restaurants.csv' target=”_blank”> restaurants.csv </a></p> <center> <h4>[protocol]://[filePath]?[encodedOptions]</h6> </center> Example: <i> csv://csv/restaurants.csv </i><br> Example of an options object: <i> csv://csv/gemany_100_postcodes.csv?latfield=Axe-y&lonfield=Axe-x&delimiter=%3A </i><br>  Where the enconded parameters represents the following options object:<br> {<br>latfield: 'Axe-y', <br>lonfield: 'Axe-x', <br>delimiter: ':'<br>} "
	},
	{
		"item": "osm",
		"description": "<p> The OSMProtocolHandler will transform OSM type files into a geojson object and register it as a source. The handler accepts an encoded options object in the source url. <br> See source file: <a href='https://github.com/mapcomponents/react-map-components-maplibre/blob/main/public/osm/palma.osm' target=”_blank”> palma.osm </a> <br> The url is expected to have the following Format: <br> </p> <center> <h4>[protocol]://[filePath]?[encodedOptions</h6> </center> Example: <i> osm://osm/palma.osm?completeFeature=true&allFeatures=false&renderTagged=false&excludeWay=false&suppressWay=false </i> <br> Where the enconded parameters represents the following options object: <br> { <br> completeFeature: true, <br> allFeatures: false,<br> renderTagged: false, <br> excludeWay: false, <br> suppressWay: false <br> }"
	},
	{
		"item": "gpx",
		"description": "<p> GPX files can be processed with the XMLProtocolHandler. This will transform the files into a geojson object and register it as a source. <br> See source file: <a href='https://github.com/mapcomponents/react-map-components-maplibre/blob/main/public/gpx/santiago.gpx' target=”_blank”> santiago.gpx </a> <br> The url is expected to have the following Format: <br> </p> <center> <h4>[protocol]://[filePath]</h6> </center> Example: <i> xml://gpx/santiago.gpx </i>"
	},
	{
		"item": "kml",
		"description": "<p> KML files can be processed with the XMLProtocolHandler. This will transform the files into a geojson object and register it as a source. <br> See source file: <a href='https://github.com/mapcomponents/react-map-components-maplibre/blob/main/public/kml/cape_may.kml' target=”_blank”> cape_may.kml </a> <br> The url is expected to have the following Format: <br> </p> <center> <h4>[protocol]://[filePath]</h6> </center> Example: <i> xml://kml/cape_may.gpx </i>"
	},
	{
		"item": "tcx",
		"description": "<p> TCX files can be processed with the XMLProtocolHandler. This will transform the files into a geojson object and register it as a source. <br> See source file: <a href='https://github.com/mapcomponents/react-map-components-maplibre/blob/main/public/tcx/example.tcx' target=”_blank”> example.tcx </a> <br> The url is expected to have the following Format: <br> </p> <center> <h4>[protocol]://[filePath]</h6> </center> Example: <i> xml://tcx/example.tcx </i>"
	},
	{
		"item": "topojson",
		"description": "<p> In this example, a topojson file is loaded with help of The TopojsonProtocolHandler. The handler transforms the topojson into a geojson object and keep register of the origin topojson object in the features properties of the new geojson. <br> See source file: <a href='https://github.com/mapcomponents/react-map-components-maplibre/blob/main/public/topojson/usa.topojson' target=”_blank”> usa.topojson </a></p> <br> The url is expected to have the following Format: <br>  </p> <center> <h4>[protocol]://[filePath]</h6> </center>  "
	}
]
;

export default _default;

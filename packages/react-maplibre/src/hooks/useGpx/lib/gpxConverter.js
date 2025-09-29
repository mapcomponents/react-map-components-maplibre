import * as xmldom from '@xmldom/xmldom';

/**
 * https://github.com/mapbox/togeojson
 *
 * Copyright (c) 2016 Mapbox All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const toGeoJSON = (function () {
	const removeSpace = /\s*/g,
		trimSpace = /^\s*|\s*$/g,
		splitSpace = /\s+/;
	// generate a short, numeric hash of a string
	function okhash(x) {
		if (!x || !x.length) return 0;
		// eslint-disable-next-line no-var
		for (var i = 0, h = 0; i < x.length; i++) {
			h = ((h << 5) - h + x.charCodeAt(i)) | 0;
		}
		return h;
	}
	// all Y children of X
	function get(x, y) {
		return x.getElementsByTagName(y);
	}
	function attr(x, y) {
		return x.getAttribute(y);
	}
	function attrf(x, y) {
		return parseFloat(attr(x, y));
	}
	// one Y child of X, if any, otherwise null
	function get1(x, y) {
		const n = get(x, y);
		return n.length ? n[0] : null;
	}
	// https://developer.mozilla.org/en-US/docs/Web/API/Node.normalize
	function norm(el) {
		if (el.normalize) {
			el.normalize();
		}
		return el;
	}
	// cast array x into numbers
	function numarray(x) {
		// eslint-disable-next-line no-var
		for (var j = 0, o = []; j < x.length; j++) {
			o[j] = parseFloat(x[j]);
		}
		return o;
	}
	// get the content of a text node, if any
	function nodeVal(x) {
		if (x) {
			norm(x);
		}
		return (x && x.textContent) || '';
	}
	// get the contents of multiple text nodes, if present
	function getMulti(x, ys) {
		// eslint-disable-next-line prefer-const
		let o = {},
			n,
			k;
		for (k = 0; k < ys.length; k++) {
			n = get1(x, ys[k]);
			if (n) o[ys[k]] = nodeVal(n);
		}
		return o;
	}
	// add properties of Y to X, overwriting if present in both
	function extend(x, y) {
		for (const k in y) x[k] = y[k];
	}
	// get one coordinate from a coordinate array, if any
	function coord1(v) {
		return numarray(v.replace(removeSpace, '').split(','));
	}
	// get all coordinates from a coordinate array as [[],[]]
	function coord(v) {
		const coords = v.replace(trimSpace, '').split(splitSpace),
			o = [];
		for (let i = 0; i < coords.length; i++) {
			o.push(coord1(coords[i]));
		}
		return o;
	}
	function coordPair(x) {
		// eslint-disable-next-line prefer-const
		let ll = [attrf(x, 'lon'), attrf(x, 'lat')],
			// eslint-disable-next-line prefer-const
			ele = get1(x, 'ele'),
			// handle namespaced attribute in browser
			// eslint-disable-next-line prefer-const
			heartRate = get1(x, 'gpxtpx:hr') || get1(x, 'hr'),
			// eslint-disable-next-line prefer-const
			time = get1(x, 'time'),
			e;
		if (ele) {
			e = parseFloat(nodeVal(ele));
			if (!isNaN(e)) {
				ll.push(e);
			}
		}
		return {
			coordinates: ll,
			time: time ? nodeVal(time) : null,
			heartRate: heartRate ? parseFloat(nodeVal(heartRate)) : null,
		};
	}

	// create a new feature collection parent object
	function fc() {
		return {
			type: 'FeatureCollection',
			features: [],
		};
	}

	let serializer;
	if (typeof XMLSerializer !== 'undefined') {
		/* istanbul ignore next */
		serializer = new XMLSerializer();
	} else {
		const isNodeEnv = typeof process === 'object' && !process.browser;
		const isTitaniumEnv = typeof Titanium === 'object';
		if (typeof exports === 'object' && (isNodeEnv || isTitaniumEnv)) {
			serializer = xmldom.XMLSerializer;
		} else {
			throw new Error('Unable to initialize serializer');
		}
	}
	function xml2str(str) {
		// IE9 will create a new XMLSerializer but it'll crash immediately.
		// This line is ignored because we don't run coverage tests in IE9
		/* istanbul ignore next */
		if (str.xml !== undefined) return str.xml;
		return serializer.serializeToString(str);
	}

	const t = {
		kml: function (doc) {
			const gj = fc(),
				// styleindex keeps track of hashed styles in order to match features
				styleIndex = {},
				styleByHash = {},
				// stylemapindex keeps track of style maps to expose in properties
				styleMapIndex = {},
				// atomic geospatial types supported by KML - MultiGeometry is
				// handled separately
				geotypes = ['Polygon', 'LineString', 'Point', 'Track', 'gx:Track'],
				// all root placemarks in the file
				placemarks = get(doc, 'Placemark'),
				styles = get(doc, 'Style'),
				styleMaps = get(doc, 'StyleMap');

			for (let k = 0; k < styles.length; k++) {
				const hash = okhash(xml2str(styles[k])).toString(16);
				styleIndex['#' + attr(styles[k], 'id')] = hash;
				styleByHash[hash] = styles[k];
			}
			for (let l = 0; l < styleMaps.length; l++) {
				styleIndex['#' + attr(styleMaps[l], 'id')] = okhash(xml2str(styleMaps[l])).toString(16);
				const pairs = get(styleMaps[l], 'Pair');
				const pairsMap = {};
				for (let m = 0; m < pairs.length; m++) {
					pairsMap[nodeVal(get1(pairs[m], 'key'))] = nodeVal(get1(pairs[m], 'styleUrl'));
				}
				styleMapIndex['#' + attr(styleMaps[l], 'id')] = pairsMap;
			}
			for (let j = 0; j < placemarks.length; j++) {
				gj.features = gj.features.concat(getPlacemark(placemarks[j]));
			}
			function kmlColor(v) {
				let color, opacity;
				v = v || '';
				if (v.substr(0, 1) === '#') {
					v = v.substr(1);
				}
				if (v.length === 6 || v.length === 3) {
					color = v;
				}
				if (v.length === 8) {
					opacity = parseInt(v.substr(0, 2), 16) / 255;
					color = '#' + v.substr(6, 2) + v.substr(4, 2) + v.substr(2, 2);
				}
				return [color, isNaN(opacity) ? undefined : opacity];
			}
			function gxCoord(v) {
				return numarray(v.split(' '));
			}
			function gxCoords(root) {
				let elems = get(root, 'coord', 'gx'),
					// eslint-disable-next-line prefer-const
					coords = [],
					// eslint-disable-next-line prefer-const
					times = [];
				if (elems.length === 0) elems = get(root, 'gx:coord');
				for (let i = 0; i < elems.length; i++) coords.push(gxCoord(nodeVal(elems[i])));
				const timeElems = get(root, 'when');
				for (let j = 0; j < timeElems.length; j++) times.push(nodeVal(timeElems[j]));
				return {
					coords: coords,
					times: times,
				};
			}
			function getGeometry(root) {
				let geomNode,
					geomNodes,
					i,
					j,
					k,
					// eslint-disable-next-line prefer-const
					geoms = [],
					// eslint-disable-next-line prefer-const
					coordTimes = [];
				if (get1(root, 'MultiGeometry')) {
					return getGeometry(get1(root, 'MultiGeometry'));
				}
				if (get1(root, 'MultiTrack')) {
					return getGeometry(get1(root, 'MultiTrack'));
				}
				if (get1(root, 'gx:MultiTrack')) {
					return getGeometry(get1(root, 'gx:MultiTrack'));
				}
				for (i = 0; i < geotypes.length; i++) {
					geomNodes = get(root, geotypes[i]);
					if (geomNodes) {
						for (j = 0; j < geomNodes.length; j++) {
							geomNode = geomNodes[j];
							if (geotypes[i] === 'Point') {
								geoms.push({
									type: 'Point',
									coordinates: coord1(nodeVal(get1(geomNode, 'coordinates'))),
								});
							} else if (geotypes[i] === 'LineString') {
								geoms.push({
									type: 'LineString',
									coordinates: coord(nodeVal(get1(geomNode, 'coordinates'))),
								});
							} else if (geotypes[i] === 'Polygon') {
								const rings = get(geomNode, 'LinearRing'),
									coords = [];
								for (k = 0; k < rings.length; k++) {
									coords.push(coord(nodeVal(get1(rings[k], 'coordinates'))));
								}
								geoms.push({
									type: 'Polygon',
									coordinates: coords,
								});
							} else if (geotypes[i] === 'Track' || geotypes[i] === 'gx:Track') {
								const track = gxCoords(geomNode);
								geoms.push({
									type: 'LineString',
									coordinates: track.coords,
								});
								if (track.times.length) coordTimes.push(track.times);
							}
						}
					}
				}
				return {
					geoms: geoms,
					coordTimes: coordTimes,
				};
			}
			function getPlacemark(root) {
				// eslint-disable-next-line prefer-const
				let geomsAndTimes = getGeometry(root),
					i,
					// eslint-disable-next-line prefer-const
					properties = {},
					// eslint-disable-next-line prefer-const
					name = nodeVal(get1(root, 'name')),
					// eslint-disable-next-line prefer-const
					address = nodeVal(get1(root, 'address')),
					styleUrl = nodeVal(get1(root, 'styleUrl')),
					// eslint-disable-next-line prefer-const
					description = nodeVal(get1(root, 'description')),
					// eslint-disable-next-line prefer-const
					timeSpan = get1(root, 'TimeSpan'),
					// eslint-disable-next-line prefer-const
					timeStamp = get1(root, 'TimeStamp'),
					// eslint-disable-next-line prefer-const
					extendedData = get1(root, 'ExtendedData'),
					lineStyle = get1(root, 'LineStyle'),
					polyStyle = get1(root, 'PolyStyle'),
					// eslint-disable-next-line prefer-const
					visibility = get1(root, 'visibility');

				if (!geomsAndTimes.geoms.length) return [];
				if (name) properties.name = name;
				if (address) properties.address = address;
				if (styleUrl) {
					if (styleUrl[0] !== '#') {
						styleUrl = '#' + styleUrl;
					}

					properties.styleUrl = styleUrl;
					if (styleIndex[styleUrl]) {
						properties.styleHash = styleIndex[styleUrl];
					}
					if (styleMapIndex[styleUrl]) {
						properties.styleMapHash = styleMapIndex[styleUrl];
						properties.styleHash = styleIndex[styleMapIndex[styleUrl].normal];
					}
					// Try to populate the lineStyle or polyStyle since we got the style hash
					const style = styleByHash[properties.styleHash];
					if (style) {
						if (!lineStyle) lineStyle = get1(style, 'LineStyle');
						if (!polyStyle) polyStyle = get1(style, 'PolyStyle');
						const iconStyle = get1(style, 'IconStyle');
						if (iconStyle) {
							const icon = get1(iconStyle, 'Icon');
							if (icon) {
								const href = nodeVal(get1(icon, 'href'));
								if (href) properties.icon = href;
							}
						}
					}
				}
				if (description) properties.description = description;
				if (timeSpan) {
					const begin = nodeVal(get1(timeSpan, 'begin'));
					const end = nodeVal(get1(timeSpan, 'end'));
					properties.timespan = { begin: begin, end: end };
				}
				if (timeStamp) {
					properties.timestamp = nodeVal(get1(timeStamp, 'when'));
				}
				if (lineStyle) {
					const linestyles = kmlColor(nodeVal(get1(lineStyle, 'color'))),
						color = linestyles[0],
						opacity = linestyles[1],
						width = parseFloat(nodeVal(get1(lineStyle, 'width')));
					if (color) properties.stroke = color;
					if (!isNaN(opacity)) properties['stroke-opacity'] = opacity;
					if (!isNaN(width)) properties['stroke-width'] = width;
				}
				if (polyStyle) {
					const polystyles = kmlColor(nodeVal(get1(polyStyle, 'color'))),
						pcolor = polystyles[0],
						popacity = polystyles[1],
						fill = nodeVal(get1(polyStyle, 'fill')),
						outline = nodeVal(get1(polyStyle, 'outline'));
					if (pcolor) properties.fill = pcolor;
					if (!isNaN(popacity)) properties['fill-opacity'] = popacity;
					if (fill) properties['fill-opacity'] = fill === '1' ? properties['fill-opacity'] || 1 : 0;
					if (outline)
						properties['stroke-opacity'] = outline === '1' ? properties['stroke-opacity'] || 1 : 0;
				}
				if (extendedData) {
					const datas = get(extendedData, 'Data'),
						simpleDatas = get(extendedData, 'SimpleData');

					for (i = 0; i < datas.length; i++) {
						properties[datas[i].getAttribute('name')] = nodeVal(get1(datas[i], 'value'));
					}
					for (i = 0; i < simpleDatas.length; i++) {
						properties[simpleDatas[i].getAttribute('name')] = nodeVal(simpleDatas[i]);
					}
				}
				if (visibility) {
					properties.visibility = nodeVal(visibility);
				}
				if (geomsAndTimes.coordTimes.length) {
					properties.coordTimes =
						geomsAndTimes.coordTimes.length === 1
							? geomsAndTimes.coordTimes[0]
							: geomsAndTimes.coordTimes;
				}
				const feature = {
					type: 'Feature',
					geometry:
						geomsAndTimes.geoms.length === 1
							? geomsAndTimes.geoms[0]
							: {
									type: 'GeometryCollection',
									geometries: geomsAndTimes.geoms,
								},
					properties: properties,
				};
				if (attr(root, 'id')) feature.id = attr(root, 'id');
				return [feature];
			}
			return gj;
		},
		gpx: function (doc) {
			let i,
				// eslint-disable-next-line prefer-const
				tracks = get(doc, 'trk'),
				// eslint-disable-next-line prefer-const
				routes = get(doc, 'rte'),
				// eslint-disable-next-line prefer-const
				waypoints = get(doc, 'wpt'),
				// a feature collection
				// eslint-disable-next-line prefer-const
				gj = fc(),
				feature;
			for (i = 0; i < tracks.length; i++) {
				feature = getTrack(tracks[i]);
				if (feature) gj.features.push(feature);
			}
			for (i = 0; i < routes.length; i++) {
				feature = getRoute(routes[i]);
				if (feature) gj.features.push(feature);
			}
			for (i = 0; i < waypoints.length; i++) {
				gj.features.push(getPoint(waypoints[i]));
			}
			function initializeArray(arr, size) {
				for (let h = 0; h < size; h++) {
					arr.push(null);
				}
				return arr;
			}
			function getPoints(node, pointname) {
				const pts = get(node, pointname),
					line = [],
					times = [],
					heartRates = [],
					l = pts.length;
				if (l < 2) return {}; // Invalid line in GeoJSON
				for (let i = 0; i < l; i++) {
					const c = coordPair(pts[i]);
					line.push(c.coordinates);
					if (c.time) times.push(c.time);
					if (c.heartRate || heartRates.length) {
						if (!heartRates.length) initializeArray(heartRates, i);
						heartRates.push(c.heartRate || null);
					}
				}
				return {
					line: line,
					times: times,
					heartRates: heartRates,
				};
			}
			function getTrack(node) {
				// eslint-disable-next-line prefer-const
				let segments = get(node, 'trkseg'),
					// eslint-disable-next-line prefer-const
					track = [],
					// eslint-disable-next-line prefer-const
					times = [],
					// eslint-disable-next-line prefer-const
					heartRates = [],
					line;
				for (let i = 0; i < segments.length; i++) {
					line = getPoints(segments[i], 'trkpt');
					if (line) {
						if (line.line) track.push(line.line);
						if (line.times && line.times.length) times.push(line.times);
						if (heartRates.length || (line.heartRates && line.heartRates.length)) {
							if (!heartRates.length) {
								for (let s = 0; s < i; s++) {
									heartRates.push(initializeArray([], track[s].length));
								}
							}
							if (line.heartRates && line.heartRates.length) {
								heartRates.push(line.heartRates);
							} else {
								heartRates.push(initializeArray([], line.line.length || 0));
							}
						}
					}
				}
				if (track.length === 0) return;
				const properties = getProperties(node);
				extend(properties, getLineStyle(get1(node, 'extensions')));
				if (times.length) properties.coordTimes = track.length === 1 ? times[0] : times;
				if (heartRates.length)
					properties.heartRates = track.length === 1 ? heartRates[0] : heartRates;
				return {
					type: 'Feature',
					properties: properties,
					geometry: {
						type: track.length === 1 ? 'LineString' : 'MultiLineString',
						coordinates: track.length === 1 ? track[0] : track,
					},
				};
			}
			function getRoute(node) {
				const line = getPoints(node, 'rtept');
				if (!line.line) return;
				const prop = getProperties(node);
				extend(prop, getLineStyle(get1(node, 'extensions')));

				return {
					type: 'Feature',
					properties: prop,
					geometry: {
						type: 'LineString',
						coordinates: line.line,
					},
				};
			}
			function getPoint(node) {
				const prop = getProperties(node);
				extend(prop, getMulti(node, ['sym']));
				return {
					type: 'Feature',
					properties: prop,
					geometry: {
						type: 'Point',
						coordinates: coordPair(node).coordinates,
					},
				};
			}
			function getLineStyle(extensions) {
				const style = {};
				if (extensions) {
					const lineStyle = get1(extensions, 'line');
					if (lineStyle) {
						const color = nodeVal(get1(lineStyle, 'color')),
							opacity = parseFloat(nodeVal(get1(lineStyle, 'opacity'))),
							width = parseFloat(nodeVal(get1(lineStyle, 'width')));
						if (color) style.stroke = color;
						if (!isNaN(opacity)) style['stroke-opacity'] = opacity;
						// GPX width is in mm, convert to px with 96 px per inch
						if (!isNaN(width)) style['stroke-width'] = (width * 96) / 25.4;
					}
				}
				return style;
			}
			function getProperties(node) {
				const prop = getMulti(node, ['name', 'cmt', 'desc', 'type', 'time', 'keywords']),
					links = get(node, 'link');
				if (links.length) prop.links = [];
				for (let i = 0, link; i < links.length; i++) {
					link = { href: attr(links[i], 'href') };
					extend(link, getMulti(links[i], ['text', 'type']));
					prop.links.push(link);
				}
				return prop;
			}
			return gj;
		},
	};
	return t;
})();

export default toGeoJSON;

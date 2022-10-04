import { LngLatLike, Map } from 'maplibre-gl';
import jsPDF from 'jspdf';
import MapLibreGlWrapper from '../../components/MapLibreMap/lib/MapLibreGlWrapper';

import * as turf from '@turf/turf';
import { BBox } from '@turf/turf';

interface createExportOptions {
	map: MapLibreGlWrapper;
	width: number;
	height: number;
	bbox: BBox;
	bboxUnrotated: BBox;
	bearing: number;
	format: string;
	orientation: string;
}
export type { createExportOptions };

const createExport = (options: createExportOptions) => {
	const width = options.width;
	const height = options.height;

	// Create map container
	const hiddenContainer = document.createElement('div');
	hiddenContainer.className = 'hidden-map';
	document.body.appendChild(hiddenContainer);
	const container = document.createElement('div');
	container.style.width = width + 'px';
	container.style.height = height + 'px';
	hiddenContainer.appendChild(container);

	const style = options.map.map.getStyle();

	// delete undefined source properties
	for (const name in style.sources) {
		const src = style.sources[name];

		Object.keys(src).forEach((key) => {
			// delete property if value is undefined.
			// for instance, raster-dem might have undefined value in "url" and "bounds"
			if (!src[key]) {
				delete src[key];
			}
		});
	}

	// Create a new MapLibre-gl instance
	const renderMap = new Map({
		container: container,
		center: options.map.map.getCenter(),
		zoom: options.map.map.getZoom(),
		bearing: 0,
		pitch: 0,
		interactive: false,
		preserveDrawingBuffer: true,
		fadeDuration: 0,
		attributionControl: false,
		style: style,
	});

	let _previewGeojson = turf.bboxPolygon([
		options.bbox[0],
		options.bbox[1],
		options.bbox[2],
		options.bbox[3],
	]);
	_previewGeojson = turf.transformRotate(_previewGeojson, options.bearing);

	// use original unrotated bbox and bearing 0 to calculate the correct zoom value as the function always adds a padding if used on the rotated feature coordinates
	const bboxCamera = renderMap._cameraForBoxAndBearing(
		[options.bboxUnrotated[0], options.bboxUnrotated[1]],
		[options.bboxUnrotated[2], options.bboxUnrotated[3]],
		0
	);
	const geometryCamera = renderMap._cameraForBoxAndBearing(
		_previewGeojson.geometry.coordinates[0][0] as LngLatLike,
		_previewGeojson.geometry.coordinates[0][2] as LngLatLike,
		options.bearing
	);
	geometryCamera.zoom = bboxCamera.zoom;

	renderMap._fitInternal(geometryCamera);
	return new Promise<createExportResolverParams>((resolve) => {
		renderMap.once('idle', function () {
			const params: createExportResolverParams = {
				...options,
				renderMap,
				hiddenContainer,
				createPdf: (_options?: createJsPdfOptions) =>
					createJsPdf({ ...options, renderMap, hiddenContainer, ..._options }),
			};

			resolve(params);
		});
	});
};

interface createExportResolverParams extends createExportOptions {
	createPdf: (_options?: createJsPdfOptions) => Promise<createPdfResolverParams>;
	renderMap: Map;
	hiddenContainer: HTMLDivElement;
}
export type { createExportResolverParams };

interface createJsPdfOptions extends createExportOptions {
	renderMap: Map;
	hiddenContainer: HTMLDivElement;
}

export type { createJsPdfOptions };

function createJsPdf(options: createJsPdfOptions) {
	const pdf = new jsPDF({
		orientation: options?.orientation === 'portrait' ? 'p' : 'l',
		unit: 'mm',
		compress: true,
		format: options.format,
	});
	Object.defineProperty(window, 'devicePixelRatio', {
		get: function () {
			return 300 / 96;
		},
	});

	return new Promise<createPdfResolverParams>((resolve) => {
		//Render map image
		pdf.addImage(
			options.renderMap.getCanvas().toDataURL('image/png'),
			'png',
			0,
			0,
			pdf.internal.pageSize.getWidth(),
			pdf.internal.pageSize.getHeight(),
			undefined,
			'FAST'
		);

		// remove DOM Elements
		options.renderMap.remove();
		options.hiddenContainer.parentNode?.removeChild(options.hiddenContainer);

		const params: createPdfResolverParams = {
			...options,
			pdf,
			downloadPdf: (_options?: downloadPdfOptions) => downloadPdf({ ...params, ..._options }),
		};

		resolve(params);
	});
}

interface createPdfResolverParams extends createJsPdfOptions {
	pdf: jsPDF;
	downloadPdf: (_options?: downloadPdfOptions) => Promise<downloadPdfOptions>;
}

export type { createPdfResolverParams };

interface downloadPdfOptions extends createJsPdfOptions {
	pdf: jsPDF;
}

function downloadPdf(options: downloadPdfOptions) {
	options.pdf.save('Map.pdf');

	return new Promise<downloadPdfOptions>(function (resolve) {
		resolve({ ...options });
	});
}

export { createExport };

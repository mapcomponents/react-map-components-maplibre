import { Map } from 'maplibre-gl';
import jsPDF from 'jspdf';
import MapLibreGlWrapper from '../../components/MapLibreMap/lib/MapLibreGlWrapper';

import { BBox } from 'geojson';

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
	hiddenContainer.style.width = '0px';
	hiddenContainer.style.height = '0px';
	hiddenContainer.style.overflow = 'hidden';
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

	const bboxCamera = renderMap._cameraForBoxAndBearing(
		[options.bboxUnrotated[0], options.bboxUnrotated[1]],
		[options.bboxUnrotated[2], options.bboxUnrotated[3]],
		options.bearing + options.map.map.getBearing()
	);

	renderMap._fitInternal(bboxCamera);
	return new Promise<createExportResolverParams>((resolve) => {
		console.log('before idle');

		renderMap.once('idle', function () {
			const params: createExportResolverParams = {
				...options,
				renderMap,
				hiddenContainer,
				createPdf: (_options?: createJsPdfOptions) =>
					createJsPdf({ ...options, renderMap, hiddenContainer, ..._options }),
				createPng: (_options?: createPngOptions) =>
					createPng({ ...options, renderMap, hiddenContainer, ..._options }),
			};

			resolve(params);
		});
	});
};

interface createExportResolverParams extends createExportOptions {
	createPdf: (_options?: createJsPdfOptions) => Promise<createPdfResolverParams>;
	createPng: (_options?: createPngOptions) => Promise<createPngResolverParams>;
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
			formData: new FormData(),
		};

		resolve(params);
	});
}
interface createPdfResolverParams extends createJsPdfOptions {
	formData: FormData;
	pdf: jsPDF;
	downloadPdf: (_options?: downloadPdfOptions) => Promise<downloadPdfOptions>;
}

interface downloadPdfOptions extends createJsPdfOptions {
	pdf: jsPDF;
}

function downloadPdf(options: downloadPdfOptions) {
	options.pdf.save('Map.pdf');

	return new Promise<downloadPdfOptions>(function (resolve) {
		resolve({ ...options });
	});
}

export type { createPdfResolverParams };

function createPng(options: createPngOptions) {
	return new Promise<createPngResolverParams>((resolve) => {
		const png = options.renderMap.getCanvas().toDataURL('image/png');
		const params: createPngResolverParams = {
			...options,
			png,
			downloadPng: (_options?: downloadPngOptions) => downloadPng({ ...params, ..._options }),
		};

		resolve(params);
	});
}

interface createPngOptions extends createExportOptions {
	renderMap: Map;
	hiddenContainer: HTMLDivElement;
}

export type { createPngOptions };

interface createPngResolverParams extends createPngOptions {
	png: string;
	downloadPng: (_options?: downloadPngOptions) => Promise<downloadPngOptions>;
}

export type { createPngResolverParams };

interface downloadPngOptions extends createPngOptions {
	// png image as data url
	png: string;
	// filename of the downloaded png
	name?: string;
}

function downloadPng(options: downloadPngOptions) {
	const _a = document.createElement('a');
	_a.download = options?.name ? options.name + '.png' : 'map.png';
	_a.href = options.png;
	document.body.appendChild(_a);
	_a.click();
	document.body.removeChild(_a);

	return new Promise<downloadPngOptions>(function (resolve) {
		resolve({ ...options });
	});
}

export { createExport };

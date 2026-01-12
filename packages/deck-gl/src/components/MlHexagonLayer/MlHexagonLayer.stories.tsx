import mapContextDecorator from '../../decorators/MapContextDecorator';
import MlHexagonLayer from './MlHexagonLayer';
import { useEffect, useState } from 'react';
import { useMap } from '@mapcomponents/react-maplibre';
import { HexagonLayer } from '@deck.gl/aggregation-layers';

const storyoptions = {
	title: 'MapComponents/MlHexagonMap',
	component: MlHexagonLayer,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (context: any) => {
	const [noiseData, setNoiseData] = useState<{ type: string; features: any[] }>({
		type: '',
		features: [],
	});
	const mapHook = useMap({ mapId: 'map_1' });

	useEffect(() => {
		let cancelled = false;
		const load = async () => {
			try {
				const res = await fetch('/assets/3D/laerm_points.json', {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const json = await res.json();
				const features = Array.isArray(json?.features) ? json.features : [];
				if (!cancelled) {
					setNoiseData({ type: json?.type ?? 'FeatureCollection', features });
				}
			} catch (e) {
				console.error(e);
				if (!cancelled) {
					setNoiseData({ type: '', features: [] });
				}
			}
		};
		load();
		return () => {
			cancelled = true;
		};
	}, []);

	mapHook.map?.setPitch(60);
	mapHook.map?.setZoom(13.5);

	return (
		<>
			<MlHexagonLayer
				data={noiseData.features}
				getPosition={(d: any) => d.geometry.coordinates}
				{...context}
			/>
		</>
	);
};

export const DefaultSettings: { [key: string]: any } = Template.bind({});
DefaultSettings.parameters = {};
DefaultSettings.args = {
	mapId: 'map_1',
	type: HexagonLayer,
	layerOpacity: 0.8,
	elevationRange: [30, 75],
	elevationScale: 1,
	extruded: true,
	coverage: 0.9,
	autoHighlight: false,
	material: { ambient: 0.6, diffuse: 0.5, shininess: 10 },
	radius: 16,
	transitions: { elevationScale: 1500 },
	_filterData: null,
	colorRange: [
		[1, 152, 189, 125],
		[73, 227, 206, 150],
		[216, 254, 181, 175],
		[254, 237, 177, 200],
		[254, 173, 84, 225],
		[209, 55, 78, 255],
	],
};
export const CustomColorAndHightProfile: { [key: string]: any } = Template.bind({});
CustomColorAndHightProfile.parameters = {};
CustomColorAndHightProfile.args = {
	mapId: 'map_1',
	type: HexagonLayer,
	layerOpacity: 0.8,
	specularColor: [51, 51, 51],
	elevationRange: [30, 75],
	elevationScale: 1,
	extruded: true,
	coverage: 0.9,
	autoHighlight: false,
	material: { ambient: 0.8, diffuse: 0.5, shininess: 10 },
	radius: 16,
	transitions: { elevationScale: 1500 },
	_filterData: null,
	colorRange: [
		[1, 152, 189, Math.round(80 * 0.8)],
		[73, 227, 206, Math.round(90 * 0.8)],
		[216, 254, 181, Math.round(100 * 0.8)],
		[254, 237, 177, Math.round(110 * 0.8)],
		[254, 173, 84, Math.round(120 * 0.8)],
		[209, 55, 78, Math.round(150 * 0.8)],
	],
	getColorValue: (points: any[]) => {
		const elVal = points.reduce((acc, point) => {
			const src = point?.properties ? point.properties : point?.source?.properties;
			if (!src?.dba && acc === -Infinity) return acc;
			return acc < src.dba ? src.dba : acc;
		}, -Infinity);
		return Number.isFinite(elVal) ? Math.round(elVal) : 0;
	},
	getElevationValue: (points: any[]) => {
		const elVal = points.reduce((acc, point) => {
			const src = point?.properties ? point.properties : point?.source?.properties;
			if (!src?.dba && acc === -Infinity) return acc;
			return acc < src.dba ? src.dba : acc;
		}, -Infinity);
		return Number.isFinite(elVal) ? Math.round(elVal) : 0;
	},
};

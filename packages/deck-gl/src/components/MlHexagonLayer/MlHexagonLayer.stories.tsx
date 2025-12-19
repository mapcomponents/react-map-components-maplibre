import mapContextDecorator from '../../decorators/MapContextDecorator';
import MlHexagonLayer from './MlHexagonLayer';
import { DeckGlContextProvider } from '../../contexts/DeckGlContext';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { useEffect, useState } from 'react';

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
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		const load = async () => {
			try {
				setLoading(true);
				setError(null);
				const res = await fetch('/assets/3D/laerm_points.json', {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const json = await res.json();
				// Expect GeoJSON-like `{ type, features }`
				const features = Array.isArray(json?.features) ? json.features : [];
				if (!cancelled) {
					setNoiseData({ type: json?.type ?? 'FeatureCollection', features });
				}
			} catch (e: any) {
				if (!cancelled) {
					setError(e?.message || 'Failed to load data');
					setNoiseData({ type: '', features: [] });
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		};
		load();
		return () => {
			cancelled = true;
		};
	}, []);

	if (loading) return <div>Loading noise data\u2026</div>;
	if (error) return <div>Failed to load data: {error}</div>;

	console.log(noiseData.features);
	return (
		<DeckGlContextProvider mapId={context.mapId}>
			<MlHexagonLayer
				data={noiseData.features}
				getPosition={(d: any) => d.geometry.coordinates}
				{...context}
			/>
		</DeckGlContextProvider>
	);
};

// eslint-disable-next-line
export const NoiseMap: { [key: string]: any } = Template.bind({});
NoiseMap.parameters = {};
NoiseMap.args = {
	mapId: 'map_1',
	type: HexagonLayer,
	layerOpacity: 0.8,
	specularColor: [51, 51, 51],
	elevationRange:[30, 75],
	elevationScale: 2,
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

import { useEffect, useMemo, useRef, useState } from 'react';
import { MlGeoJsonLayer, useMap } from '@mapcomponents/react-maplibre';
import * as d3 from 'd3';
import { useStationContext } from '../contexts/StationContext';
import carPathsData from '../assets/carPaths.json';

export interface IconAnimationLayerProps {
	mapId?: string;
	iconUrl?: string;
	iconSize?: number;
	animationDuration?: number;
	fps?: number;
	showPaths?: boolean;
	pathColor?: string;
	pathWidth?: number;
}

const IconAnimationLayer = ({
	mapId,
	iconUrl = '/icon-layer-car.png',
	iconSize = 1,
	animationDuration = 20000,
	fps = 30,
	showPaths = false,
	pathColor = '#000',
	pathWidth = 2,
}: IconAnimationLayerProps) => {
	const icon = iconUrl;
	const mapHook = useMap({ mapId });
	const { selectedStation } = useStationContext();
	const [iconPositions, setIconPositions] = useState<
		Record<string, { position: [number, number]; bearing: number }>
	>({});
	const animationFrameRef = useRef<number | undefined>(undefined);
	const lastUpdateTimeRef = useRef<number>(0);

	const isActive = selectedStation?.label === 'MlIconLayer';

	// Import paths from external JSON file
	const paths = useMemo(() => carPathsData as unknown as Record<string, [number, number][]>, []);

	const getPathGeoJson = useMemo(
		(): GeoJSON.FeatureCollection => ({
			type: 'FeatureCollection',
			features: Object.entries(paths).map(([pathName, coordinates]) => ({
				type: 'Feature',
				properties: { name: pathName },
				geometry: {
					type: 'LineString',
					coordinates: coordinates,
				},
			})),
		}),
		[paths]
	);

	const getIconGeoJson = useMemo(
		(): GeoJSON.FeatureCollection => ({
			type: 'FeatureCollection',
			features: Object.entries(iconPositions).map(([pathName, data]) => ({
				type: 'Feature',
				properties: {
					name: pathName,
					icon: 'icon',
					bearing: data.bearing,
				},
				geometry: {
					type: 'Point',
					coordinates: data.position,
				},
			})),
		}),
		[iconPositions]
	);

	useEffect(() => {
		if (!mapHook.map || !isActive) return;

		// Load the car icon
		const loadImage = async () => {
			if (mapHook.map?.hasImage('icon')) return;

			const img = new Image();
			img.src = icon;
			await new Promise<void>((resolve, reject) => {
				img.onload = () => {
					if (!mapHook.map?.hasImage('icon')) {
						mapHook.map?.addImage('icon', img);
					}
					resolve();
				};
				img.onerror = reject;
			});
		};

		loadImage();

		interface PathSegment {
			interpolator: (t: number) => [number, number];
			distance: number;
			start: number;
		}

		// Pre-calculate all interpolators once
		const pathInterpolators = Object.entries(paths).map(([pathName, coordinates]) => {
			const segments: PathSegment[] = [];
			let totalDistance = 0;

			for (let i = 0; i < coordinates.length - 1; i++) {
				const start = coordinates[i] as [number, number];
				const end = coordinates[i + 1] as [number, number];
				const interpolator = d3.geoInterpolate(start, end);
				const distance = d3.geoDistance(start, end);
				segments.push({ interpolator, distance, start: totalDistance });
				totalDistance += distance;
			}

			return { pathName, segments, totalDistance };
		});

		// Animation parameters
		const duration = animationDuration;
		const FPS_TARGET = fps;
		const FRAME_DURATION = 1000 / FPS_TARGET;
		const startTime = performance.now();

		// Calculate bearing between two geographic points (in degrees)
		const calculateBearing = (start: [number, number], end: [number, number]): number => {
			const [lon1, lat1] = start;
			const [lon2, lat2] = end;

			const dLon = ((lon2 - lon1) * Math.PI) / 180;
			const lat1Rad = (lat1 * Math.PI) / 180;
			const lat2Rad = (lat2 * Math.PI) / 180;

			const y = Math.sin(dLon) * Math.cos(lat2Rad);
			const x =
				Math.cos(lat1Rad) * Math.sin(lat2Rad) -
				Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);

			const bearing = Math.atan2(y, x);
			return ((bearing * 180) / Math.PI + 360) % 360;
		};

		// Binary search for segment
		const findSegment = (segments: PathSegment[], targetDistance: number): PathSegment => {
			let left = 0;
			let right = segments.length - 1;

			while (left < right) {
				const mid = Math.floor((left + right + 1) / 2);
				if (segments[mid].start <= targetDistance) {
					left = mid;
				} else {
					right = mid - 1;
				}
			}

			return segments[left];
		};

		// Single animation loop for all icons
		const animate = (currentTime: number) => {
			// Throttle to target FPS
			if (currentTime - lastUpdateTimeRef.current < FRAME_DURATION) {
				animationFrameRef.current = requestAnimationFrame(animate);
				return;
			}

			lastUpdateTimeRef.current = currentTime;
			const elapsed = currentTime - startTime;

			// Calculate all positions and bearings in one pass
			const newPositions: Record<string, { position: [number, number]; bearing: number }> = {};

			pathInterpolators.forEach(({ pathName, segments, totalDistance }, index) => {
				const offsetElapsed = (elapsed + index * 2500) % duration;
				const t = offsetElapsed / duration;
				const targetDistance = t * totalDistance;

				// Use binary search for segment
				const currentSegment = findSegment(segments, targetDistance);

				// Calculate position within the segment
				const segmentProgress = (targetDistance - currentSegment.start) / currentSegment.distance;
				const position = currentSegment.interpolator(segmentProgress);

				// Calculate bearing: look slightly ahead on the path for smooth rotation
				const lookAheadProgress = Math.min(segmentProgress + 0.01, 1);
				const lookAheadPosition = currentSegment.interpolator(lookAheadProgress);
				const bearing = calculateBearing(position, lookAheadPosition);

				newPositions[pathName] = { position, bearing };
			});

			// Single state update for all icons
			setIconPositions(newPositions);

			animationFrameRef.current = requestAnimationFrame(animate);
		};

		// Start animation
		animationFrameRef.current = requestAnimationFrame(animate);

		// Cleanup
		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [mapHook.map, paths, icon, isActive, animationDuration, fps]);

	if (!isActive) {
		return null;
	}

	return (
		<>
			{showPaths && (
				<MlGeoJsonLayer
					geojson={getPathGeoJson}
					type="line"
					options={{
						paint: { 'line-color': pathColor, 'line-width': pathWidth },
					}}
				/>
			)}

			<MlGeoJsonLayer
				geojson={getIconGeoJson}
				type="symbol"
				options={{
					layout: {
						'icon-image': 'icon',
						'icon-size': iconSize,
						'icon-rotate': ['get', 'bearing'],
						'icon-rotation-alignment': 'map',
						'icon-allow-overlap': true,
						'icon-ignore-placement': true,
					},
				}}
			/>
		</>
	);
};

export default IconAnimationLayer;

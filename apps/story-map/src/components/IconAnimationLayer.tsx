import { useEffect, useMemo, useRef, useState } from 'react';
import { MlGeoJsonLayer, useMap } from '@mapcomponents/react-maplibre';
import * as d3 from 'd3';
import { useStationContext } from '../contexts/StationContext';
import carPathsData from '../assets/carPaths.json';

const IconAnimationLayer = () => {
	const carIcon = '/icon-layer-car.png';
	const mapHook = useMap({ mapId: undefined });
	const { selectedStation } = useStationContext();
	const [carPositions, setCarPositions] = useState<Record<string, [number, number]>>({});
	const animationFrameRef = useRef<number | undefined>(undefined);
	const lastUpdateTimeRef = useRef<number>(0);

	const isActive = selectedStation?.label === 'MlIconLayer';

	// Import paths from external JSON file
	const paths = useMemo(() => carPathsData as unknown as Record<string, [number, number][]>, []);

	const getCarGeoJson = useMemo(
		(): GeoJSON.FeatureCollection => ({
			type: 'FeatureCollection',
			features: Object.entries(carPositions).map(([pathName, coordinates]) => ({
				type: 'Feature',
				properties: { name: pathName, icon: 'car' },
				geometry: {
					type: 'Point',
					coordinates: coordinates,
				},
			})),
		}),
		[carPositions]
	);

	useEffect(() => {
		if (!mapHook.map || !isActive) return;

		// Load the car icon
		const loadImage = async () => {
			if (mapHook.map?.hasImage('car')) return;

			const img = new Image();
			img.src = carIcon;
			await new Promise<void>((resolve, reject) => {
				img.onload = () => {
					if (!mapHook.map?.hasImage('car')) {
						mapHook.map?.addImage('car', img);
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
		const duration = 10000;
		const FPS_TARGET = 30;
		const FRAME_DURATION = 1000 / FPS_TARGET;
		const startTime = performance.now();

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

		// Single animation loop for all cars
		const animate = (currentTime: number) => {
			// Throttle to target FPS
			if (currentTime - lastUpdateTimeRef.current < FRAME_DURATION) {
				animationFrameRef.current = requestAnimationFrame(animate);
				return;
			}

			lastUpdateTimeRef.current = currentTime;
			const elapsed = currentTime - startTime;

			// Calculate all positions in one pass
			const newPositions: Record<string, [number, number]> = {};

			pathInterpolators.forEach(({ pathName, segments, totalDistance }, index) => {
				const offsetElapsed = (elapsed + index * 2500) % duration;
				const t = offsetElapsed / duration;
				const targetDistance = t * totalDistance;

				// Use binary search for segment
				const currentSegment = findSegment(segments, targetDistance);

				// Calculate position within the segment
				const segmentProgress = (targetDistance - currentSegment.start) / currentSegment.distance;
				newPositions[pathName] = currentSegment.interpolator(segmentProgress);
			});

			// Single state update for all cars
			setCarPositions(newPositions);

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
	}, [mapHook.map, paths, carIcon, isActive]);

	if (!isActive) {
		return null;
	}

	return (
		<>
			<MlGeoJsonLayer
				geojson={getCarGeoJson}
				type="symbol"
				options={{
					layout: {
						'icon-image': 'car',
						'icon-size': 0.15,
						'icon-allow-overlap': true,
						'icon-ignore-placement': true,
					},
				}}
			/>
		</>
	);
};

export default IconAnimationLayer;

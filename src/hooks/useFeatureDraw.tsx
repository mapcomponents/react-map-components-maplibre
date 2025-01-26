import useMap from './useMap';
import { useEffect, useRef, useState } from 'react';
import { TerraDraw } from 'terra-draw';
import { TerraDrawMapLibreGLAdapter } from 'terra-draw-maplibre-gl-adapter';
import { TerraDrawBaseDrawMode } from 'terra-draw/dist/modes/base.mode';

export interface useFeatureDrawProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * Id of an existing layer in the mapLibre instance to help specify the layer order
	 * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
	 */
	insertBeforeLayer?: string;
	/**
	 * drawing mode
	 */
	mode: TerraDrawBaseDrawMode<any>[];
}

const useFeatureDraw = (props: useFeatureDrawProps) => {
	const draw = useRef<TerraDraw | null>(null);
	const [isDrawing, setIsDrawing] = useState<boolean>(false);
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const cleanup = () => {
		if (draw.current) {
			draw.current.stop();
			draw.current.clear();
			draw.current = null;
		}
		setIsDrawing(false);
	};

	const initializeDraw = () => {
		if (!mapHook.map) return;
		// Clean up any existing instance first
		cleanup();
		draw.current = new TerraDraw({
			adapter: new TerraDrawMapLibreGLAdapter(mapHook.map),
			modes: props.mode,
		});
	};

	useEffect(() => {
		initializeDraw();
		return () => cleanup();
	}, [mapHook.map, props.mode]);

	const setMode = (mode: string): void => {
		if (!draw.current) return;

		try {
			draw.current.setMode(mode);
			setIsDrawing(mode !== 'select');
		} catch (error) {
			console.error('Error setting mode:', error);
			setIsDrawing(false);
		}
	};

	const startDrawing = (mode: string) => {
		if (!draw.current) initializeDraw();
		if (!draw.current) return;

		try {
			if (!isDrawing) {
				draw.current.start();
			}
			setMode(mode);
		} catch (error) {
			console.error('Error starting drawing:', error);
			cleanup();
		}
	};

	const stopDrawing = (): void => {
		if (draw.current) {
			setMode('select');
		}
	};

	const clearDrawing = (): void => {
		if (draw.current) {
			draw.current.clear();
			initializeDraw();
		}
	};

	return { startDrawing, stopDrawing, clearDrawing, isDrawing };
};
export default useFeatureDraw;

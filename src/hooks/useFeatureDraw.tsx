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

	const initializeDraw = () => {
		if (mapHook.map && !draw.current) {
			draw.current = new TerraDraw({
				adapter: new TerraDrawMapLibreGLAdapter(mapHook.map),
				modes: props.mode,
			});
		}
	};

	useEffect(() => {
		initializeDraw();
	}, [mapHook.map, props.mode]);

	const setMode = (mode: string): void => {
		draw.current?.setMode(mode);
		setIsDrawing(mode !== 'select');
	};

	const startDrawing = (mode: string): void => {
		if (!draw.current) {
			initializeDraw();
		}
		if (draw.current && !isDrawing) {
			draw.current.start();
			setMode(mode);
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
		}
	};

	return { startDrawing, stopDrawing, clearDrawing, isDrawing };
};
export default useFeatureDraw;

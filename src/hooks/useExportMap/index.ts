import { useMemo } from 'react';
import useMap from '../useMap';
import { createExport, createExportOptions } from './lib';
import MapLibreGlWrapper from '../../components/MapLibreMap/lib/MapLibreGlWrapper';

interface exportMapProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
}

export default function useExportMap(props: exportMapProps) {
	const mapHook = useMap({ mapId: props.mapId });

	const _createExport = useMemo(() => {
		if (mapHook.map) {
			return (
				options: Omit<createExportOptions, 'map'> & Partial<Pick<createExportOptions, 'map'>>
			) => {
				return createExport({ map: mapHook.map as MapLibreGlWrapper, ...options });
			};
		}
		return;
	}, [mapHook.map]);

	return {
		createExport: _createExport,
	};
}

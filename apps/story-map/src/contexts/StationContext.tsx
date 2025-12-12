import React, {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useCallback,
	useContext,
	useState,
} from 'react';
import { Position } from 'geojson';
import { useMap } from '@mapcomponents/react-maplibre';
import { LngLatLike } from 'maplibre-gl';

export interface StationType {
	label: string;
	id: string;
	stationTitle: string;
	description: string;
	breakpoint: Position;
	markerCoordinates: Position;
	presentationPosition: CameraPositionType;
}

export interface CameraPositionType {
	zoom?: number;
	pitch?: number;
	bearing?: number;
}

interface StationContextType {
	stationInformations: StationType[];
	selectStationById: (id: string) => void;
	selectedStation: StationType | undefined;
	setSelectedStation: Dispatch<SetStateAction<StationType | undefined>>;
	selectedStationIndex: number | undefined;
	nextStation: () => void;
	resetStations: () => void;
}

const StationContext = createContext<StationContextType | undefined>(undefined);

export const StationProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const stationInformations = [
		{
			label: 'MlMarker',
			id: 'MlMarker-Station',
			stationTitle: 'MlMarker.title',
			description: 'MlMarker.description',
			breakpoint: [7.085638047138517, 50.76945740939362],
			markerCoordinates: [7.08563805, 50.76945741],
			presentationPosition: {
				zoom: 16,
				pitch: 45,
				bearing: 180,
			},
		},
		{
			label: 'MlThreeJsLayer',
			id: 'MlThreeJsLayer-Station',
			stationTitle: 'MlThreeJsLayer.title',
			description: 'MlThreeJsLayer.description',
			breakpoint: [7.098185442221093, 50.7646377315985],
			markerCoordinates: [7.09818544, 50.76463773],
			presentationPosition: {
				zoom: 16,
				pitch: 45,
				bearing: 180,
			},
		},
		{
			label: 'MlGeoJsonLayer',
			id: 'MlGeoJsonLayer-Station',
			stationTitle: 'MlGeoJsonLayer.title',
			description: 'MlGeoJsonLayer.description',
			breakpoint: [7.087355551216711, 50.75253402948829],
			markerCoordinates: [7.084156, 50.755443],
			presentationPosition: {
				zoom: 14.9,
				pitch: 20,
				bearing: 330,
			},
		},
		{
			label: 'MlFillExtrusionLayer',
			id: 'MlFillExtrusionLayer-Station',
			stationTitle: 'MlFillExtrusionLayer.title',
			description: 'MlFillExtrusionLayer.description',
			breakpoint: [7.089958056461611, 50.74361199615757],
			markerCoordinates: [7.08995806, 50.743612],
			presentationPosition: {
				zoom: 16,
				pitch: 45,
				bearing: 180,
			},
		},
		{
			label: 'MlIconLayer',
			id: 'MlIconLayer-Station',
			stationTitle: 'MlIconLayer.title',
			description: 'MlIconLayer.description',
			breakpoint: [7.098939161759019, 50.74014846518186],
			markerCoordinates: [7.09893916, 50.74014847],
			presentationPosition: {
				zoom: 16,
				pitch: 45,
				bearing: 180,
			},
		},
		{
			label: 'MlMapMagnify',
			id: 'MlMapMagnify-Station',
			stationTitle: 'MlMapMagnify.title',
			description: 'MlMapMagnify.description',
			breakpoint: [7.077900099390418, 50.72942598571806],
			markerCoordinates: [7.07094, 50.73064],
			presentationPosition: {
				zoom: 14.9,
				pitch: 50,
				bearing: 230,
			},
		},
		{
			label: 'MlHexagonMap',
			id: 'MlHexagonMap-Station',
			stationTitle: 'MlHexagonMap.title',
			description: 'MlHexagonMap.description',
			breakpoint: [7.117405153027723, 50.719066572026435],
			markerCoordinates: [7.1161140331124955, 50.724392629576926],
			presentationPosition: {
				zoom: 14.9,
				pitch: 75,
				bearing: 120,
			},
		},
		{
			label: 'PointCloud',
			id: 'PointCloud-Station',
			stationTitle: 'PointCloud.title',
			description: 'PointCloud.description',
			breakpoint: [7.143431851902436, 50.71761182062817],
			markerCoordinates: [7.147225, 50.722738],
			presentationPosition: {
				zoom: 16.5,
				pitch: 70,
				bearing: 20,
			},
		},
		{
			label: 'MlCreatePdfForm',
			id: 'MlCreatePdfForm-Station',
			stationTitle: 'MlCreatePdfForm.title',
			description: 'MlCreatePdfForm.description',
			breakpoint: [7.225963879312019, 50.76098226444658],
			markerCoordinates: [7.22596388, 50.76098226],
			presentationPosition: {
				zoom: 14.9,
				pitch: 0,
				bearing: 0,
			},
		},
		{
			label: 'MlTerrainLayer',
			id: 'MlTerrainLayer-Station',
			stationTitle: 'MlTerrainLayer.title',
			description: 'MlTerrainLayer.description',
			breakpoint: [7.27501663089742, 50.78439051649292],
			markerCoordinates: [7.27501663, 50.78439052],
			presentationPosition: {
				zoom: 16,
				pitch: 45,
				bearing: 180,
			},
		},
		{
			label: 'MultiTab',
			id: 'MultiTab-Station',
			stationTitle: 'MultiTab.title',
			description: 'MultiTab.description',
			breakpoint: [7.193647087933583, 50.87354147861542],
			markerCoordinates: [7.19364709, 50.87354148],
			presentationPosition: {
				zoom: 16,
				pitch: 45,
				bearing: 180,
			},
		},
		{
			label: '3DTiles',
			id: '3DTiles-Station',
			stationTitle: '3DTiles.title',
			description: '3DTiles.description',
			breakpoint: [9.928492094755804, 53.43130875716747],
			markerCoordinates: [9.92849209, 53.43130876],
			presentationPosition: {
				zoom: 16,
				pitch: 45,
				bearing: 180,
			},
		},
	];
	const mapHook = useMap({mapId: 'map_1'});

	const [selectedStation, setSelectedStation] = useState<StationType | undefined>(undefined);
	const [selectedStationIndex, setSelectedStationIndex] = useState<number | undefined>(undefined);

	const selectStationById = useCallback((id: string) => {
		const station = stationInformations.find((s) => s.id === id);
		const index = stationInformations.findIndex((s) => s.id === id);
		if (station) {
			setSelectedStation(station);
		}
		if (index || index === 0) {
			setSelectedStationIndex(index);
		}
	}, []);

	const nextStation = () => {
		let currentStation = 0
		setSelectedStationIndex((prevState) => {
			if (prevState === undefined) {
				currentStation = 0;
				return 0;
			} else if (prevState + 1 > stationInformations.length - 1){
				currentStation = 0;
				return 0;
			}
			else {
				currentStation = prevState + 1;
				return prevState + 1;
			}
		});
		if (mapHook.map) {
			mapHook.map.easeTo({
				center: stationInformations[currentStation].breakpoint as LngLatLike,
				...stationInformations[currentStation].presentationPosition,
			});
		}
		setSelectedStation(stationInformations[currentStation])
	};

	const resetStations = () => {
		setSelectedStationIndex(undefined);
	}

	return (
		<StationContext.Provider
			value={{
				stationInformations,
				selectedStation,
				selectedStationIndex,
				setSelectedStation,
				selectStationById,
				nextStation,
				resetStations
			}}
		>
			{children}
		</StationContext.Provider>
	);
};

export const useStationContext = () => {
	const ctx = useContext(StationContext);
	if (!ctx) throw new Error('useStationContext must be used within StationProvider');
	return ctx;
};

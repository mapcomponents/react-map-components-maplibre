import React, {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useCallback,
	useContext,
	useState,
} from 'react';

export interface StationType {
	label: string;
	id: string;
	stationTitle: string;
	description: string;
	selected: boolean;
	position: number[];
	zoom: number;
	speed: number;
	pitch: number;
	breakpoint: number[];
	markerCoordinates: number[];
}

interface StationContextType {
	stationInformations: StationType[];
	selectStationById: (id: string) => void;
	selectedStation: StationType | undefined;
	setSelectedStation: Dispatch<SetStateAction<StationType | undefined>>;
}

const StationContext = createContext<StationContextType | undefined>(undefined);

export const StationProvider: React.FC<PropsWithChildren<Record<string, never>>> = ({
	children,
}) => {
	const stationInformations = [
		{
			label: 'MlMarker',
			id: 'MlMarker-Station',
			stationTitle: 'MlMarker.title',
			description: 'MlMarker.description',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.08563805, 50.76945741],
			markerCoordinates: [7.08563805, 50.76945741],
		},
		{
			label: 'useCameraFollowPath',
			id: 'useCameraFollowPath-Station',
			stationTitle: 'useCameraFollowPath.title',
			description: 'useCameraFollowPath.description',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.09261471, 50.76729082],
			markerCoordinates: [7.09261471, 50.76729082],
		},
		{
			label: 'MlThreeJsLayer',
			id: 'MlThreeJsLayer-Station',
			stationTitle: 'MlThreeJsLayer.title',
			description: 'MlThreeJsLayer.description',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.09818544, 50.76463773],
			markerCoordinates: [7.09818544, 50.76463773],
		},
		{
			label: 'MlGeoJsonLayer',
			id: 'MlGeoJsonLayer-Station',
			stationTitle: 'MlGeoJsonLayer.title',
			description: 'MlGeoJsonLayer.description',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.08735555, 50.75253403],
			markerCoordinates: [7.08735555, 50.75253403],
		},
		{
			label: 'MlFillExtrusionLayer',
			id: 'MlFillExtrusionLayer-Station',
			stationTitle: 'MlFillExtrusionLayer.title',
			description: 'MlFillExtrusionLayer.description',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.08995806, 50.743612],
			markerCoordinates: [7.08995806, 50.743612],
		},
		{
			label: 'MlIconLayer',
			id: 'MlIconLayer-Station',
			stationTitle: 'MlIconLayer.title',
			description: 'MlIconLayer.description',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.09893916, 50.74014847],
			markerCoordinates: [7.09893916, 50.74014847],
		},
		{
			label: 'MlLayerSwipe',
			id: 'MlLayerSwipe-Station',
			stationTitle: 'MlLayerSwipe.title',
			description: 'MlLayerSwipe.description',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.0779001, 50.72942599],
			markerCoordinates: [7.0779001, 50.72942599],
		},
		{
			label: 'MlHexagonMap',
			id: 'MlHexagonMap-Station',
			stationTitle: 'MlHexagonMap.title',
			description: 'MlHexagonMap.description',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.11740515, 50.71906657],
			markerCoordinates: [7.11740515, 50.71906657],
		},
		{
			label: 'PointCloud',
			id: 'PointCloud-Station',
			stationTitle: 'PointCloud.title',
			description: 'PointCloud.description',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.14343185, 50.71761182],
			markerCoordinates: [7.14343185, 50.71761182],
		},
		{
			label: 'MlCreatePdfForm',
			id: 'MlCreatePdfForm-Station',
			stationTitle: 'MlCreatePdfForm.title',
			description: 'MlCreatePdfForm.description',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.22596388, 50.76098226],
			markerCoordinates: [7.22596388, 50.76098226],
		},
		{
			label: 'MlTerrainLayer',
			id: 'MlTerrainLayer-Station',
			stationTitle: 'MlTerrainLayer.title',
			description: 'MlTerrainLayer.description',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.27501663, 50.78439052],
			markerCoordinates: [7.27501663, 50.78439052],
		},
		{
			label: 'MultiTab',
			id: 'MultiTab-Station',
			stationTitle: 'MultiTab.title',
			description: 'MultiTab.description',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.19364709, 50.87354148],
			markerCoordinates: [7.19364709, 50.87354148],
		},
		{
			label: '3DTiles',
			id: '3DTiles-Station',
			stationTitle: '3DTiles.title',
			description: '3DTiles.description',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [9.92849209, 53.43130876],
			markerCoordinates: [9.92849209, 53.43130876],
		},
	];

	const [selectedStation, setSelectedStation] = useState<StationType | undefined>();

	const selectStationById = useCallback((id: string) => {
		const station = stationInformations.find((s) => s.id === id);
		if (station) {
			setSelectedStation(station);
		}
	}, []);

	return (
		<StationContext.Provider
			value={{
				stationInformations,
				selectedStation,
				setSelectedStation,
				selectStationById,
			}}
		>
			{children}
		</StationContext.Provider>
	);
};

export default StationContext;

export const useStationContext = () => {
	const ctx = useContext(StationContext);
	if (!ctx) throw new Error('useStationContext must be used within StationProvider');
	return ctx;
};

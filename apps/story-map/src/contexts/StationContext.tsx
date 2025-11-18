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
			label: 'NoiseMap',
			id: 'NoiseMap-Station',
			description: 'NoiseMap.description',
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

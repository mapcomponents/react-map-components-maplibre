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
	descriptionId: string;
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
			descriptionId: '',
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.085638047138517, 50.76945740939362],
			markerCoordinates: [],
		},
		{
			label: 'useCameraFollowPath',
			id: 'useCameraFollowPath-Station',
			descriptionId: '',
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.092614706387437, 50.76729082257119],
			markerCoordinates: [],
		},
		{
			label: 'MlThreeJsLayer',
			id: 'MlThreeJsLayer-Station',
			descriptionId: '',
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.09818544, 50.76463773],
			markerCoordinates: [],
		},
		{
			label: 'MlGeoJsonLayer',
			id: 'MlGeoJsonLayer-Station',
			descriptionId: '',
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.08735555, 50.75253403],
			markerCoordinates: [],
		},
		{
			label: 'SimpleBuildings',
			id: 'SimpleBuildings-Station',
			descriptionId: '',
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.08995806, 50.743612],
			markerCoordinates: [],
		},
		{
			label: 'MlIconLayer',
			id: 'MlIconLayer-Station',
			descriptionId: '',
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.09893916, 50.74014847],
			markerCoordinates: [],
		},
		{
			label: 'MapCurtain',
			id: 'MapCurtain-Station',
			descriptionId: '',
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.0779001, 50.72942599],
			markerCoordinates: [],
		},
		{
			label: 'NoiseMap',
			id: 'NoiseMap-Station',
			descriptionId: '',
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.11740515, 50.71906657],
			markerCoordinates: [],
		},
		{
			label: 'PointCloud',
			id: 'PointCloud-Station',
			descriptionId: '',
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.14343185, 50.71761182],
			markerCoordinates: [],
		},
		{
			label: 'MlCreatePdf',
			id: 'MlCreatePdf-Station',
			descriptionId: '',
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.22596388, 50.76098226],
			markerCoordinates: [],
		},
		{
			label: 'TerrainLayer',
			id: 'TerrainLayer-Station',
			descriptionId: '',
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.27501663, 50.78439052],
			markerCoordinates: [],
		},
		{
			label: 'Multitab',
			id: 'Multitab-Station',
			descriptionId: '',
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.19364709, 50.87354148],
			markerCoordinates: [],
		},
		{
			label: '3dTiles',
			id: '3dTiles-Station',
			descriptionId: '',
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [9.92849209, 53.43130876],
			markerCoordinates: [],
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

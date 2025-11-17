import React, {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState,
} from 'react';

export interface StationType {
	label: string;
	id: string;
	descriptionId: string;
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
	setStationInformations: Dispatch<SetStateAction<StationType[]>>
	selectStationById: (id: string) => void;
	selectedStation: StationType | undefined;
}

const StationContext = createContext<StationContextType | undefined>(undefined);

export const StationProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
	const [stationInformations, setStationInformations] = useState<StationType[]>([
		{
			label: 'MlMarker',
			id: 'MlMarker-Station',
			descriptionId: '',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.08563805, 50.76945741],
			markerCoordinates: []
		},
		{
			label: 'useCameraFollowPath',
			id: 'useCameraFollowPath-Station',
			descriptionId: '',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.09261471, 50.76729082],
			markerCoordinates: []
		},
		{
			label: 'MlThreeJsLayer',
			id: 'MlThreeJsLayer-Station',
			descriptionId: '',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.09818544, 50.76463773],
			markerCoordinates: []
		},
		{
			label: 'MlGeoJsonLayer',
			id: 'MlGeoJsonLayer-Station',
			descriptionId: '',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.08735555, 50.75253403],
			markerCoordinates: []
		},
		{
			label: 'SimpleBuildings',
			id: 'SimpleBuildings-Station',
			descriptionId: '',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.08995806, 50.74361200],
			markerCoordinates: []
		},
		{
			label: 'MlIconLayer',
			id: 'MlIconLayer-Station',
			descriptionId: '',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.09893916, 50.74014847],
			markerCoordinates: []
		},
		{
			label: 'MapCurtain',
			id: 'MapCurtain-Station',
			descriptionId: '',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.0779001, 50.72942599],
			markerCoordinates: []
		},
		{
			label: 'NoiseMap',
			id: 'NoiseMap-Station',
			descriptionId: '',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.11740515, 50.71906657],
			markerCoordinates: []
		},
		{
			label: 'PointCloud',
			id: 'PointCloud-Station',
			descriptionId: '',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.14343185, 50.71761182],
			markerCoordinates: []
		},
		{
			label: 'MlCreatePdf',
			id: 'MlCreatePdf-Station',
			descriptionId: '',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.22596388, 50.76098226],
			markerCoordinates: []
		},
		{
			label: 'TerrainLayer',
			id: 'TerrainLayer-Station',
			descriptionId: '',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.27501663, 50.78439052],
			markerCoordinates: []
		},
		{
			label: 'Multitab',
			id: 'Multitab-Station',
			descriptionId: '',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [7.19364709, 50.87354148],
			markerCoordinates: []
		},
		{
			label: '3dTiles',
			id: '3dTiles-Station',
			descriptionId: '',
			selected: false,
			position: [],
			zoom: 16,
			speed: 5,
			pitch: 60,
			breakpoint: [9.92849209, 53.43130876],
			markerCoordinates: []
		},
	]);
	const [selectedStation, setSelectedStation] = useState<StationType>();

	const selectStationById = (id: string) => {
		const tempArry: StationType[] = [];
		for (const station of stationInformations) {
			tempArry.push({
				...station,
				selected: id === station.id,
			});
			if (id === station.id) setSelectedStation(station);
		}
			setStationInformations(tempArry);
	};
	return (
		<StationContext.Provider
			value={{
				stationInformations,
				setStationInformations,
				selectStationById,
				selectedStation
			}}
		>
			{children}
		</StationContext.Provider>
	);
};

export default StationContext;

export const useStationContext = () => {
	const ctx = useContext(StationContext);
	if (!ctx) throw new Error("useViewer must be used within ViewerProvider");
	return ctx;
}

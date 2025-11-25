import React, {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useCallback,
	useContext,
	useState,
} from 'react';
import { CameraPositionType } from '../components/CameraController';
import { Position } from 'geojson';

export interface StationType {
	label: string;
	id: string;
	description: string;
	zoom: number;
	speed: number;
	breakpoint: Position;
	markerCoordinates: Position;
	presentationPosition?: CameraPositionType;
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
			zoom: 17,
			speed: 2,
			breakpoint: [7.085638047138517, 50.76945740939362],
			markerCoordinates: [7.08563805, 50.76945741],
		},
		{
			label: 'useCameraFollowPath',
			id: 'useCameraFollowPath-Station',
			description: 'useCameraFollowPath.description',
			zoom: 17,
			speed: 2,
			breakpoint: [7.092614706387437, 50.76729082257119],
			markerCoordinates: [7.09261471, 50.76729082],
		},
		{
			label: 'MlThreeJsLayer',
			id: 'MlThreeJsLayer-Station',
			description: 'MlThreeJsLayer.description',
			zoom: 17,
			speed: 3,
			breakpoint: [7.098185442221093, 50.7646377315985],
			markerCoordinates: [7.09818544, 50.76463773],
		},
		{
			label: 'MlGeoJsonLayer',
			id: 'MlGeoJsonLayer-Station',
			description: 'MlGeoJsonLayer.description',
			zoom: 17,
			speed: 2,
			breakpoint: [7.087355551216711, 50.75253402948829],
			markerCoordinates: [7.084156, 50.755443],
			presentationPosition: {
				zoom: 14.9,
				pitch: 0,
				bearing: 330
			}
		},
		{
			label: 'MlFillExtrusionLayer',
			id: 'MlFillExtrusionLayer-Station',
			description: 'MlFillExtrusionLayer.description',
			zoom: 17,
			speed: 1,
			breakpoint: [7.089958056461611, 50.74361199615757],
			markerCoordinates: [7.08995806, 50.743612],
		},
		{
			label: 'MlIconLayer',
			id: 'MlIconLayer-Station',
			description: 'MlIconLayer.description',
			zoom: 17,
			speed: 1,
			breakpoint: [7.098939161759019, 50.74014846518186],
			markerCoordinates: [7.09893916, 50.74014847],
		},
		{
			label: 'MlLayerSwipe',
			id: 'MlLayerSwipe-Station',
			description: 'MlLayerSwipe.description',
			zoom: 17,
			speed: 2,
			breakpoint: [7.077900099390418, 50.72942598571806],
			markerCoordinates: [7.0779001, 50.72942599],
		},
		{
			label: 'NoiseMap',
			id: 'NoiseMap-Station',
			description: 'NoiseMap.description',
			zoom: 17,
			speed: 1,
			breakpoint: [7.117405153027723, 50.719066572026435],
			markerCoordinates: [7.11740515, 50.71906657],
		},
		{
			label: 'PointCloud',
			id: 'PointCloud-Station',
			description: 'PointCloud.description',
			zoom: 17,
			speed: 3,
			breakpoint: [7.143431851902436, 50.71761182062817],
			markerCoordinates: [7.14343185, 50.71761182],
		},
		{
			label: 'MlCreatePdfForm',
			id: 'MlCreatePdfForm-Station',
			description: 'MlCreatePdfForm.description',
			zoom: 17,
			speed: 2,
			breakpoint: [7.225963879312019, 50.76098226444658],
			markerCoordinates: [7.22596388, 50.76098226],
		},
		{
			label: 'MlTerrainLayer',
			id: 'MlTerrainLayer-Station',
			description: 'MlTerrainLayer.description',
			zoom: 12,
			speed: 3,
			breakpoint: [7.27501663089742, 50.78439051649292],
			markerCoordinates: [7.27501663, 50.78439052],
		},
		{
			label: 'MultiTab',
			id: 'MultiTab-Station',
			description: 'MultiTab.description',
			zoom: 8,
			speed: 5,
			breakpoint: [7.193647087933583, 50.87354147861542],
			markerCoordinates: [7.19364709, 50.87354148],
		},
		{
			label: '3DTiles',
			id: '3DTiles-Station',
			description: '3DTiles.description',
			zoom: 17,
			speed: 1,
			breakpoint: [9.928492094755804, 53.43130875716747],
			markerCoordinates: [9.92849209, 53.43130876],
		},
	];

	const [selectedStation, setSelectedStation] = useState<StationType>();

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

import { MlMarker } from '@mapcomponents/react-maplibre';
import { useTranslation } from 'react-i18next';
import { StationType } from '../contexts/StationContext';
import { createMarkerContentHtml } from '../utils/markerContent';

interface MarkerComponentProps {
	selectedStation: StationType | undefined;
}

const MarkerStationComponent = ({ selectedStation }: MarkerComponentProps) => {
	const { t } = useTranslation();

	if (!selectedStation) {
		return null;
	}

	return (
		<MlMarker
			key={selectedStation.id}
			lng={selectedStation.markerCoordinates[0]}
			lat={selectedStation.markerCoordinates[1]}
			content={createMarkerContentHtml(
				t,
				selectedStation.label,
				selectedStation.description,
				`${selectedStation.markerCoordinates[1]}, ${selectedStation.markerCoordinates[0]}`
			)}
			containerStyle={{
				borderRadius: '8px',
				boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
				overflow: 'hidden',
				backgroundColor: 'white',
			}}
		/>
	);
};

export default MarkerStationComponent;

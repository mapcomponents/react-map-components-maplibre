import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	DialogContent,
	DialogTitle,
	Grid,
	Typography,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import LayersIcon from '@mui/icons-material/Layers';
import ImageIcon from '@mui/icons-material/Image';
import PlaceIcon from '@mui/icons-material/Place';
import RouteIcon from '@mui/icons-material/Route';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useTranslation } from 'react-i18next';

export interface LayerTypeFormProps {
	onSelect: (type: string) => void;
	layerTypes: string[];
}

const typeIconMap: Record<string, React.ReactNode> = {
	geojson: <PlaceIcon sx={{ fontSize: 32 }} />,
	wms: <ImageIcon sx={{ fontSize: 32 }} />,
	vt: <LayersIcon sx={{ fontSize: 32 }} />,
	mbtiles: <MapIcon sx={{ fontSize: 32 }} />,
	csv: <DataObjectIcon sx={{ fontSize: 32 }} />,
	topojson: <DataObjectIcon sx={{ fontSize: 32 }} />,
	osm: <RouteIcon sx={{ fontSize: 32 }} />,
	gpx: <RouteIcon sx={{ fontSize: 32 }} />,
	kml: <RouteIcon sx={{ fontSize: 32 }} />,
	tcx: <RouteIcon sx={{ fontSize: 32 }} />,
};

const typeLabelKeys: Record<string, string> = {
	geojson: 'addLayerButton.type.geojson',
	wms: 'addLayerButton.type.wms',
	vt: 'addLayerButton.type.vt',
	mbtiles: 'addLayerButton.type.mbtiles',
	csv: 'addLayerButton.type.csv',
	topojson: 'addLayerButton.type.topojson',
	osm: 'addLayerButton.type.osm',
	gpx: 'addLayerButton.type.gpx',
	kml: 'addLayerButton.type.kml',
	tcx: 'addLayerButton.type.tcx',
};

const typeDescKeys: Record<string, string> = {
	geojson: 'addLayerButton.typeDesc.geojson',
	wms: 'addLayerButton.typeDesc.wms',
	vt: 'addLayerButton.typeDesc.vt',
	mbtiles: 'addLayerButton.typeDesc.mbtiles',
	csv: 'addLayerButton.typeDesc.csv',
	topojson: 'addLayerButton.typeDesc.topojson',
	osm: 'addLayerButton.typeDesc.osm',
	gpx: 'addLayerButton.typeDesc.gpx',
	kml: 'addLayerButton.typeDesc.kml',
	tcx: 'addLayerButton.typeDesc.tcx',
};

const typeDefaultLabels: Record<string, string> = {
	geojson: 'GeoJSON',
	wms: 'WMS',
	vt: 'Vector Tiles',
	mbtiles: 'MBTiles',
	csv: 'CSV',
	topojson: 'TopoJSON',
	osm: 'OpenStreetMap',
	gpx: 'GPX',
	kml: 'KML',
	tcx: 'TCX',
};

const typeDefaultDescs: Record<string, string> = {
	geojson: 'Load a local GeoJSON file or paste GeoJSON data',
	wms: 'Connect to a Web Map Service endpoint',
	vt: 'Add a vector tile layer from a tile URL',
	mbtiles: 'Load a local MBTiles file',
	csv: 'Import geographic data from a CSV file',
	topojson: 'Load a TopoJSON topology file',
	osm: 'Import OpenStreetMap data from a file',
	gpx: 'Load a GPX track or waypoint file',
	kml: 'Load a KML geographic data file',
	tcx: 'Load a TCX activity file',
};

const LayerTypeForm = (props: LayerTypeFormProps) => {
	const { t } = useTranslation();

	return (
		<>
			<DialogTitle sx={{ pb: 1 }}>
				{t(
					props.layerTypes.length > 1
						? 'addLayerButton.selectLayerType'
						: 'addLayerButton.loadNewLayer',
					props.layerTypes.length > 1 ? 'Select a layer type' : 'Load new layer'
				)}
			</DialogTitle>
			<DialogContent sx={{ pt: 1, minWidth: 340 }}>
				<Grid container spacing={1.5}>
					{props.layerTypes.map((type) => (
						<Grid size={{ xs: 6 }} key={type}>
							<Card
								variant="outlined"
								sx={{ height: '100%' }}
							>
								<CardActionArea
									onClick={() => props.onSelect(type)}
									sx={{ height: '100%' }}
								>
									<CardContent>
										<Box sx={{ color: 'primary.main', mb: 1 }}>
											{typeIconMap[type] ?? <LayersIcon sx={{ fontSize: 32 }} />}
										</Box>
										<Typography variant="subtitle2" fontWeight={600} gutterBottom>
											{t(typeLabelKeys[type] ?? type, typeDefaultLabels[type] ?? type)}
										</Typography>
										<Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4 }}>
											{t(typeDescKeys[type] ?? '', typeDefaultDescs[type] ?? '')}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					))}
				</Grid>
			</DialogContent>
		</>
	);
};

export default LayerTypeForm;

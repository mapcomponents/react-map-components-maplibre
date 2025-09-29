import { GeoJSONFeature } from 'maplibre-gl';
import { GeoJsonObject } from 'geojson';

export type GeoJSON = GeoJSONFeature & GeoJsonObject;

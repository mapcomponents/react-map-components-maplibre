import { GeoJSONFeature } from "maplibre-gl";
import { GeoJSONObject } from '@turf/turf';

export type GeoJSON = (GeoJSONFeature & GeoJSONObject);


/**
 * Local type definitions for the AddLayerButton form flow.
 *
 * These represent the *form-level* configuration that the user fills in before
 * a layer is added to the Zustand store.  They intentionally omit `uuid` and
 * `folder` because those are store-level concerns added by the caller.
 */

import { MlGeoJsonLayerProps } from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import { MlVectorTileLayerProps } from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import { Layer } from 'wms-capabilities';

export interface wmsLoaderConfigProps {
	getFeatureInfoUrl: string;
	layers: Layer[];
	name: string;
	open: boolean;
	visible: boolean;
	wmsUrl: string;
}

export interface wmsConfig {
	featureInfoActive?: boolean;
	config?: wmsLoaderConfigProps;
	url: string;
}

export type WmsLayerConfig = {
	type: 'wms';
	name?: string;
	id?: string;
	config: wmsConfig;
};

export type GeojsonLayerConfig = {
	type: 'geojson';
	name?: string;
	id?: string;
	config: MlGeoJsonLayerProps;
};

export type VtLayerConfig = {
	type: 'vt';
	name?: string;
	id?: string;
	config: MlVectorTileLayerProps;
};

export type LayerConfig = WmsLayerConfig | GeojsonLayerConfig | VtLayerConfig;

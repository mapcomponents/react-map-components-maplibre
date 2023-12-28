import React, { useEffect, useState } from 'react';
import { Button, SxProps } from '@mui/material';
import * as turf from '@turf/turf';
import {
	FeatureCollection,
	GeoJSONObject,
	Geometry,
	GeometryCollection,
	Properties,
} from '@turf/turf';
import MlMeasureTool from '../MlMeasureTool/MlMeasureTool';
import LayerList from '../../ui_components/LayerList/LayerList';
import LayerListItem from '../../ui_components/LayerList/LayerListItem';
import Sidebar from '../../ui_components/Sidebar';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';

export interface MlMultiMeasureToolProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * Id of an existing layer in the mapLibre instance to help specify the layer order
	 * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
	 */
	insertBeforeLayer?: string;
	/**
	 * Style attribute for the button-style
	 * https://mui.com/system/getting-started/the-sx-prop/
	 */
	buttonStyleOverride?: SxProps;
	/**
	 * String that specify if the Tool measures an area ("polygon") or length ("line")
	 */
	measureType?: 'polygon' | 'line';
	/**
	 * String that dictates which unit of measurement is used
	 */
	unit?: turf.Units;
	/**
	 * Callback function that is called each time measurment geometry within has changed within MlMeasureTool.
	 * First parameter is the new GeoJson feature.
	 */
	onChange?: (options: { value: number; unit: string | undefined; geojson: GeoJSONObject }) => void;
}

const MlMultiMeasureTool2 = (props: MlMultiMeasureToolProps) => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [measureState, setMeasureState] = useState<{
		measure: number;
		unit?: string;
		geojson: GeoJSONObject;
	}>();
	const [measureList, setMeasureList] = useState<any>([]);
	console.log(measureList);

	const [reload, setReload] = useState(false);
	const handleMeasureChange = (options: {
		value: number;
		unit: string | undefined;
		geojson: GeoJSONObject;
	}) => {
		setMeasureState({
			measure: options.value,
			unit: options.unit,
			geojson: options.geojson,
		});
	};

	useEffect(() => {
		reload && setReload(false);
		reload &&
			measureState &&
			setMeasureList((current: any) => {
				const newList = [...current];
				newList.push(measureState);
				return newList;
			});
	}, [reload]);

	return (
		<>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Multi Measure Tool'}>
				{!reload && (
					<MlMeasureTool
						measureType={'line'}
						onChange={handleMeasureChange}
						onFinish={() => {
							setReload(true);
						}}
					/>
				)}
				<LayerList>
					{measureList.map(
						(
							measure: { measure: number; unit?: string; geojson: GeoJSONObject },
							Index: number
						) => (
							<>
								<LayerListItem
									key={measure.measure}
									layerComponent={
										<MlGeoJsonLayer
											geojson={
												measure.geojson as FeatureCollection<
													Geometry | GeometryCollection,
													Properties
												>
											}
										/>
									}
									visible={true}
									configurable={true}
									type="layer"
									name={measure.measure.toString() + measure.unit}
								/>
								<Button onClick={() => console.log(Index)}> Delete </Button>
							</>
						)
					)}
				</LayerList>
			</Sidebar>
		</>
	);
};

export default MlMultiMeasureTool2;

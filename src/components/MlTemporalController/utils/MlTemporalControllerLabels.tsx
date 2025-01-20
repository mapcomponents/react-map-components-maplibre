import React from 'react';

import  MlLayer  from '../../MlLayer/MlLayer';
import {
	SymbolLayerSpecification,
	SymbolLayoutProps,
} from 'maplibre-gl';
import { FeatureCollection } from 'geojson';
import { useLayerProps } from '../../../hooks/useLayer';


interface MlTemporalControllerLabelsProps {
	data: FeatureCollection;
	currentVal: number;
	fadeIn: number;
	fadeOut: number;
	step: number;
	labelField: string;
	labelColor: string;
	timeField: string;
	minVal: number;
	accumulate: boolean;
	isPlaying: boolean;
	labelLayout?: SymbolLayoutProps;
	labelPaint?: SymbolLayerSpecification;
	}

export default function MlTemporalControllerLabels(props: MlTemporalControllerLabelsProps) {

const fadeInSteps = props.currentVal - props.fadeIn * props.step;
const fadeOutSteps = props.currentVal + props.fadeIn * props.step;

const noShow: SymbolLayerSpecification["paint"] = { 'text-color': 'rgba(0,0,0,0)' };
const defaultPaint: SymbolLayerSpecification["paint"] = {
		'text-color': props.labelColor,
		'text-opacity': [
			'interpolate',
			['linear'],
			['get', props.timeField],
			
			fadeInSteps,
			0,
			props.currentVal,
			1,
			fadeOutSteps,
			0,
		
		]	  
	};  

	const accumulatePaint: SymbolLayerSpecification["paint"] = {
		'text-color': props.labelColor,
		'text-opacity': [
			'interpolate',
			['linear'],
			['get', props.timeField],
			
			props.currentVal,
			1,
			fadeOutSteps,
			0,
		]	
	}

	const currentPaint = ()=>{
		if (props.currentVal === props.minVal && !props.isPlaying) {
			return noShow;
		}
		if (props.accumulate) {
			return accumulatePaint;
		} else {
			return defaultPaint;
		}
	}

	
	const defaultLayout: SymbolLayerSpecification["layout"] = {
		'text-field': ['get', props.labelField],
		'text-font': ['Metropolis Regular'],
	}


	return (
		<MlLayer
			options={{
				type: 'symbol',
				layout: props.labelLayout || defaultLayout,
				paint: props.labelPaint || currentPaint(),
			} as useLayerProps['options']}
			geojson={props.data}
			layerId={'timeControllerLabels'}
		/>
	);
}

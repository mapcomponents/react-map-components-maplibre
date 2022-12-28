import React from 'react';

import  MlLayer  from '../../MlLayer/MlLayer';
import {
	SymbolLayerSpecification,
	SymbolLayoutProps,
	//SymbolPaintProps
} from 'maplibre-gl';

interface MlTemporalControllerLabelsProps {
	data: any ;
	currentVal: number;
	fadeIn: number;
	fadeOut: number;
	step: number;
	labelField: String;
	labelColor: String;
	timeField: String;
	minVal: number;
	accumulate: boolean;
	isPlaying: boolean;
	labelLayout?: SymbolLayoutProps;
	labelPaint?: SymbolLayerSpecification;
	}

export default function MlTemporalControllerLabels(props: MlTemporalControllerLabelsProps) {

const fadeInSteps = props.currentVal - props.fadeIn * props.step;
const fadeOutSteps = props.currentVal + props.fadeIn * props.step;

const noShow: any = { 'text-color': 'rgba(0,0,0,0)' };
const defaultPaint: any = {
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

	const accumulatePaint: any = {
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

	
	const defaultLayout: any = {
		'text-field': ['get', props.labelField],
		'text-font': ['Metropolis Regular'],
	}


	return (
		<MlLayer
			options={{
				type: 'symbol',
				source: 'timeController',
				layout: props.labelLayout || defaultLayout,
				paint: props.labelPaint || currentPaint(),
			}}
			geojson={props.data}
			layerId={'timeControllerLabels'}
		/>
	);
}

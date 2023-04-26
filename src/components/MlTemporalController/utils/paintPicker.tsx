import {
	LineLayerSpecification,
	CircleLayerSpecification,
	FillLayerSpecification,

} from 'maplibre-gl';

interface paintPickerProps {
	type: 'fill' | 'line' | 'circle' | undefined,
	timeField: string,
	currentVal: number,
	minVal: number,
	isPlaying: boolean,
	fadeIn: number ,
	fadeOut: number,
	step: number,
	featuresColor: string,
	accumulate: boolean,
	userPaint: CircleLayerSpecification['paint']
	| FillLayerSpecification['paint']
	| LineLayerSpecification['paint'];
}

export default function paintPicker(props: paintPickerProps) {
	const circleNoShow = { 'circle-color': 'rgba(0,0,0,0)' };
	const fillNoShow = { 'fill-color': 'rgba(0,0,0,0)', 'fill-outline-color':'rgba(0,0,0,0)' };
	const lineNoShow = {'line-color': 'rgba(0,0,0,0)'}


	const opacityInterpolate = [
		'interpolate',
		['linear'],
		['get', props.timeField],
		props.currentVal - props.fadeIn * props.step,
		0,
		props.currentVal,
		1,
		props.currentVal + props.fadeOut * props.step,
		0,
	];

	const accumulatedOpacityInterpolate = [
		'interpolate',
		['linear'],
		['get', props.timeField],
		props.currentVal,
		1,
		props.currentVal + props.fadeOut * props.step,
		0,
	];

	const defaultFillPaint = {
		'fill-color': props.featuresColor,
		'fill-opacity': opacityInterpolate,
		'fill-outline-color': [
			'interpolate',
			['linear'],
			['get', props.timeField],
			props.currentVal - props.fadeIn * props.step,
			'rgba(255, 0, 0, 0)',
			props.currentVal,
			'rgb(0,0,0)',
			props.currentVal + props.fadeIn * props.step,
			'rgba(255, 0, 0, 0)',
		],
	};

	const defaultCirclePaint = {
		'circle-color': props.featuresColor,
		'circle-radius': [
			'interpolate',
			['linear'],
			['get', props.timeField],
			props.currentVal - props.fadeIn * props.step,
			1,
			props.currentVal,
			20,
			props.currentVal + props.fadeOut * props.step,
			1,
		],
		'circle-opacity': opacityInterpolate,
	};
	const defaultLinePaint = {
'line-color': props.featuresColor,
'line-width': 3,
'line-opacity': opacityInterpolate

	};

	const circleAccumulatePaint = {
		'circle-color': props.featuresColor,

		'circle-radius': [
			'interpolate',
			['linear'],
			['get', props.timeField],
			props.currentVal,
			20,
			props.currentVal + props.fadeOut * props.step,
			1,
		],

		'circle-opacity': accumulatedOpacityInterpolate,
	};

	const fillAccumulatePaint = {
		'fill-color': props.featuresColor,
		'fill-opacity': accumulatedOpacityInterpolate,
		'fill-outline-color': [
			'interpolate',
			['linear'],
			['get', props.timeField],
			props.currentVal,
			'rgb(0,0,0)',
			props.currentVal + props.fadeIn * props.step,
			'rgba(255, 0, 0, 0)',
		],
	};

	const lineAccumulatePaint = {
		'line-color': props.featuresColor,
		'line-width': 3,
		'line-opacity': accumulatedOpacityInterpolate
	};

	if (props.userPaint !== undefined) {
		return props.userPaint;
	} else {
		switch (props.type) {
			case 'circle':
				if (props.currentVal === props.minVal && !props.isPlaying) {
					return circleNoShow;
				} else if (props.accumulate ) {
					return circleAccumulatePaint;
				} else {
					return defaultCirclePaint;
				}
				
			case 'fill':
				if (props.currentVal === props.minVal && !props.isPlaying) {
					return fillNoShow;
				} else if (props.accumulate ) {
					return fillAccumulatePaint;
				} else {
					return defaultFillPaint;
				}

				case 'line':
					if (props.currentVal === props.minVal && !props.isPlaying) {
						return lineNoShow;
					} else if (props.accumulate ) {
						return lineAccumulatePaint;
					} else {
						return defaultLinePaint;
					}
				case undefined:
					if (props.currentVal === props.minVal && !props.isPlaying) {
						return circleNoShow;
					} else if (props.accumulate ) {
						return circleAccumulatePaint;
					} else {
						return defaultCirclePaint;
					}
		}
	}
}

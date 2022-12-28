
export default function paintPicker(
	type: 'fill' | 'line' | 'circle',
	timeField: String,
	currentVal: number,
	minVal: number,
	isPlaying: boolean,
	fadeIn: number,
	fadeOut: number,
	step: number,
	featuresColor: String,
	accumulate: boolean,
	userPaint: any
) {
	const circleNoShow = { 'circle-color': 'rgba(0,0,0,0)' };
	const fillNoShow = { 'fill-color': 'rgba(0,0,0,0)', 'fill-outline-color':'rgba(0,0,0,0)' };
	const lineNoShow = {'line-color': 'rgba(0,0,0,0)'}

	const colorInterpolate = [
		'interpolate',
		['linear'],
		['get', timeField],
		currentVal - fadeIn * step,
		'rgba(255, 0, 0, 0)',
		currentVal,
		featuresColor,
		currentVal + fadeIn * step,
		'rgba(255, 0, 0, 0)',
	];

	const opacityInterpolate = [
		'interpolate',
		['linear'],
		['get', timeField],
		currentVal - fadeIn * step,
		0,
		currentVal,
		1,
		currentVal + fadeOut * step,
		0,
	];

	const accumulatedColorInterpolate = [
		'interpolate',
		['linear'],
		['get', timeField],
		currentVal,
		featuresColor,
		currentVal + fadeIn * step,
		'rgba(255, 0, 0, 0)',
	];

	const accumulatedOpacityInterpolate = [
		'interpolate',
		['linear'],
		['get', timeField],
		currentVal,
		1,
		currentVal + fadeOut * step,
		0,
	];

	const defaultFillPaint = {
		'fill-color': colorInterpolate,
		'fill-opacity': opacityInterpolate,
		'fill-outline-color': [
			'interpolate',
			['linear'],
			['get', timeField],
			currentVal - fadeIn * step,
			'rgba(255, 0, 0, 0)',
			currentVal,
			'rgb(0,0,0)',
			currentVal + fadeIn * step,
			'rgba(255, 0, 0, 0)',
		],
	};

	const defaultCirclePaint = {
		'circle-color': colorInterpolate,
		'circle-radius': [
			'interpolate',
			['linear'],
			['get', timeField],
			currentVal - fadeIn * step,
			1,
			currentVal,
			20,
			currentVal + fadeOut * step,
			1,
		],
		'circle-opacity': opacityInterpolate,
	};
	const defaultLinePaint = {
'line-color': colorInterpolate,
'line-opacity': opacityInterpolate 

	};

	const circleAccumulatePaint = {
		'circle-color': accumulatedColorInterpolate,

		'circle-radius': [
			'interpolate',
			['linear'],
			['get', timeField],
			currentVal,
			20,
			currentVal + fadeOut * step,
			1,
		],

		'circle-opacity': accumulatedOpacityInterpolate,
	};

	const fillAccumulatePaint = {
		'fill-color': accumulatedColorInterpolate,
		'fill-opacity': accumulatedOpacityInterpolate,
		'fill-outline-color': [
			'interpolate',
			['linear'],
			['get', timeField],
			currentVal,
			'rgb(0,0,0)',
			currentVal + fadeIn * step,
			'rgba(255, 0, 0, 0)',
		],
	};

	const lineAccumulatePaint = {
		'line-color': accumulatedColorInterpolate,
		'line-opacity': accumulatedOpacityInterpolate
	};

	if (userPaint !== undefined) {
		return userPaint;
	} else {
		switch (type) {
			case 'circle':
				if (currentVal === minVal && !isPlaying) {
					return circleNoShow;
				} else if (accumulate ) {
					return circleAccumulatePaint;
				} else {
					return defaultCirclePaint;
				}
				
			case 'fill':
				if (currentVal === minVal && !isPlaying) {
					return fillNoShow;
				} else if (accumulate ) {
					return fillAccumulatePaint;
				} else {
					return defaultFillPaint;
				}

				case 'line':
					if (currentVal === minVal && !isPlaying) {
						return lineNoShow;
					} else if (accumulate ) {
						return lineAccumulatePaint;
					} else {
						return defaultLinePaint;
					}
				
		}
	}
}

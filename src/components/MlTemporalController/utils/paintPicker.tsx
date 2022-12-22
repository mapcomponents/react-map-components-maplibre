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
	const fillNoShow = { 'fill-color': 'rgba(0,0,0,0)' };

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
	const defaultFillPaint = {
		'fill-color': colorInterpolate,
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

		'circle-opacity': [
			'interpolate',
			['linear'],
			['get', timeField],
			currentVal - fadeIn * step,
			0,
			currentVal,
			1,
			currentVal + fadeOut * step,
			0,
		],
	};

	const accumulatePaint = {
		'circle-color': [
			'interpolate',
			['linear'],
			['get', timeField],
			currentVal,
			featuresColor,
			currentVal + fadeIn * step,
			'rgba(255, 0, 0, 0)',
		],

		'circle-radius': [
			'interpolate',
			['linear'],
			['get', timeField],
			currentVal,
			20,
			currentVal + fadeOut * step,
			1,
		],

		'circle-opacity': [
			'interpolate',
			['linear'],
			['get', timeField],
			currentVal,
			1,
			currentVal + fadeOut * step,
			0,
		],
	};

	if (userPaint !== undefined) {
		return userPaint;
	} else {
	
		switch (type) {
			case 'circle':
				if (currentVal === minVal && !isPlaying) {
					return circleNoShow;
				} else if (accumulate && isPlaying) {
					return accumulatePaint;
				} else {
					return defaultCirclePaint;
				}
				break;
			case 'fill':
				if (currentVal === minVal && !isPlaying) {
					return fillNoShow;
				} else {
					return defaultFillPaint;
				}
				break;
		}
	}
}

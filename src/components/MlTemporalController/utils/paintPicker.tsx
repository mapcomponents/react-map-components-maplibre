

export default function paintPicker(
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
	const noShow = { 'circle-color': 'rgba(0,0,0,0)' };
	const defaultPaint = {
		'circle-color': [
			'interpolate',
			['linear'],
			['get', timeField],
			currentVal - fadeIn * step,
			'rgba(255, 0, 0, 0)',
			currentVal,
			featuresColor,
			currentVal + fadeIn * step,
			'rgba(255, 0, 0, 0)',
		],

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
		if (currentVal === minVal && !isPlaying) {
			return noShow;
		}
		if (accumulate && isPlaying) {
			return accumulatePaint;
		} else {
			return defaultPaint;
		}
	}
}

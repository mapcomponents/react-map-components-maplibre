export default {
	getPrintBbox: function (centerX, centerY, width, height, scale) {
		console.log(centerX, centerY, width, height, scale)
		var projectedWidth = width * scale;
		var projectedHeight = height * scale;

		return [
			centerX,
			centerY,
			centerX + 0.000008 * projectedWidth,
			centerY - 0.000005 * projectedHeight,
		];
	},
};

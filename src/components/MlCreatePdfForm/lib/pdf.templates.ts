interface PdfTemplateType{
	width: number;
	height: number;
};
interface PdfTemplateObject{
	[key:string]:({[key:string]:PdfTemplateType});
};

const PdfTemplates:PdfTemplateObject = {
	A4: {
		'300dpi': {
			width: 2480,
			height: 3508,
		},
		'150dpi': {
			width: 1240,
			height: 1754,
		},
		'72dpi': {
			width: 595,
			height: 842,
		},
	},
	A3: {
		'300dpi': {
			width: 3505,
			height: 4961,
		},
		'150dpi': {
			width: 1754,
			height: 2480,
		},
		'72dpi': {
			width: 842,
			height: 1191,
		},
	},
	A2: {
		'300dpi': {
			width: 4961,
			height: 7016,
		},
		'150dpi': {
			width: 2480,
			height: 3508,
		},
		'72dpi': {
			width: 1191,
			height: 1684,
		},
	},
	A1: {
		'300dpi': {
			width: 7016,
			height: 9933,
		},
		'150dpi': {
			width: 3508,
			height: 4967,
		},
		'72dpi': {
			width: 1684,
			height: 2384,
		},
	},
	A0: {
		'300dpi': {
			width: 9933,
			height: 14043,
		},
		'150dpi': {
			width: 4967,
			height: 7022,
		},
		'72dpi': {
			width: 2384,
			height: 3370,
		},
	},
};

export default PdfTemplates;
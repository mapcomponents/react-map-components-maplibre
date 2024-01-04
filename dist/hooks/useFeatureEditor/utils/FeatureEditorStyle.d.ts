declare function featureEditorStyle(): ({
    id: string;
    type: string;
    filter: (string | string[])[];
    paint: {
        'fill-color': string;
        'fill-outline-color': string;
        'fill-opacity': number;
        'circle-radius'?: undefined;
        'circle-color'?: undefined;
        'line-color'?: undefined;
        'line-width'?: undefined;
        'line-dasharray'?: undefined;
        'circle-opacity'?: undefined;
    };
    layout?: undefined;
} | {
    id: string;
    type: string;
    filter: (string | string[])[];
    paint: {
        'circle-radius': number;
        'circle-color': string;
        'fill-color'?: undefined;
        'fill-outline-color'?: undefined;
        'fill-opacity'?: undefined;
        'line-color'?: undefined;
        'line-width'?: undefined;
        'line-dasharray'?: undefined;
        'circle-opacity'?: undefined;
    };
    layout?: undefined;
} | {
    id: string;
    type: string;
    filter: (string | string[])[];
    layout: {
        'line-cap': string;
        'line-join': string;
    };
    paint: {
        'line-color': string;
        'line-width': number;
        'fill-color'?: undefined;
        'fill-outline-color'?: undefined;
        'fill-opacity'?: undefined;
        'circle-radius'?: undefined;
        'circle-color'?: undefined;
        'line-dasharray'?: undefined;
        'circle-opacity'?: undefined;
    };
} | {
    id: string;
    type: string;
    filter: (string | string[])[];
    layout: {
        'line-cap': string;
        'line-join': string;
    };
    paint: {
        'line-color': string;
        'line-dasharray': number[];
        'line-width': number;
        'fill-color'?: undefined;
        'fill-outline-color'?: undefined;
        'fill-opacity'?: undefined;
        'circle-radius'?: undefined;
        'circle-color'?: undefined;
        'circle-opacity'?: undefined;
    };
} | {
    id: string;
    type: string;
    filter: (string | string[])[];
    paint: {
        'circle-radius': number;
        'circle-opacity': number;
        'circle-color': string;
        'fill-color'?: undefined;
        'fill-outline-color'?: undefined;
        'fill-opacity'?: undefined;
        'line-color'?: undefined;
        'line-width'?: undefined;
        'line-dasharray'?: undefined;
    };
    layout?: undefined;
})[];
export default featureEditorStyle;

import { LineLayerSpecification, CircleLayerSpecification, FillLayerSpecification } from 'maplibre-gl';
interface paintPickerProps {
    type: 'fill' | 'line' | 'circle' | undefined;
    timeField: string;
    currentVal: number;
    minVal: number;
    isPlaying: boolean;
    fadeIn: number;
    fadeOut: number;
    step: number;
    featuresColor: string;
    accumulate: boolean;
    userPaint: CircleLayerSpecification['paint'] | FillLayerSpecification['paint'] | LineLayerSpecification['paint'];
}
export default function paintPicker(props: paintPickerProps): {
    "circle-radius"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<number> | undefined;
    "circle-color"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<string> | undefined;
    "circle-blur"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<number> | undefined;
    "circle-opacity"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<number> | undefined;
    "circle-translate"?: import("maplibre-gl").PropertyValueSpecification<[number, number]> | undefined;
    "circle-translate-anchor"?: import("maplibre-gl").PropertyValueSpecification<"map" | "viewport"> | undefined;
    "circle-pitch-scale"?: import("maplibre-gl").PropertyValueSpecification<"map" | "viewport"> | undefined;
    "circle-pitch-alignment"?: import("maplibre-gl").PropertyValueSpecification<"map" | "viewport"> | undefined;
    "circle-stroke-width"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<number> | undefined;
    "circle-stroke-color"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<string> | undefined;
    "circle-stroke-opacity"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<number> | undefined;
} | {
    "fill-antialias"?: import("maplibre-gl").PropertyValueSpecification<boolean> | undefined;
    "fill-opacity"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<number> | undefined;
    "fill-color"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<string> | undefined;
    "fill-outline-color"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<string> | undefined;
    "fill-translate"?: import("maplibre-gl").PropertyValueSpecification<[number, number]> | undefined;
    "fill-translate-anchor"?: import("maplibre-gl").PropertyValueSpecification<"map" | "viewport"> | undefined;
    "fill-pattern"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<string> | undefined;
} | {
    "line-opacity"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<number> | undefined;
    "line-color"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<string> | undefined;
    "line-translate"?: import("maplibre-gl").PropertyValueSpecification<[number, number]> | undefined;
    "line-translate-anchor"?: import("maplibre-gl").PropertyValueSpecification<"map" | "viewport"> | undefined;
    "line-width"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<number> | undefined;
    "line-gap-width"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<number> | undefined;
    "line-offset"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<number> | undefined;
    "line-blur"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<number> | undefined;
    "line-dasharray"?: import("maplibre-gl").PropertyValueSpecification<number[]> | undefined;
    "line-pattern"?: import("maplibre-gl").DataDrivenPropertyValueSpecification<string> | undefined;
    "line-gradient"?: import("maplibre-gl").ExpressionSpecification | undefined;
} | {
    'circle-color': string;
} | {
    'fill-color': string;
    'fill-outline-color': string;
} | {
    'line-color': string;
} | {
    'fill-color': string;
    'fill-opacity': (string | number | string[])[];
    'fill-outline-color': (string | number | string[])[];
};
export {};

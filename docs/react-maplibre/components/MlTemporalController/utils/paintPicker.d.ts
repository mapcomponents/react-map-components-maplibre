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
    "fill-antialias"?: import('maplibre-gl').PropertyValueSpecification<boolean>;
    "fill-opacity"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "fill-color"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<import('maplibre-gl').ColorSpecification>;
    "fill-outline-color"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<import('maplibre-gl').ColorSpecification>;
    "fill-translate"?: import('maplibre-gl').PropertyValueSpecification<[number, number]>;
    "fill-translate-anchor"?: import('maplibre-gl').PropertyValueSpecification<"map" | "viewport">;
    "fill-pattern"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<import('maplibre-gl').ResolvedImageSpecification>;
} | {
    "line-opacity"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "line-color"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<import('maplibre-gl').ColorSpecification>;
    "line-translate"?: import('maplibre-gl').PropertyValueSpecification<[number, number]>;
    "line-translate-anchor"?: import('maplibre-gl').PropertyValueSpecification<"map" | "viewport">;
    "line-width"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "line-gap-width"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "line-offset"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "line-blur"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "line-dasharray"?: import('maplibre-gl').PropertyValueSpecification<Array<number>>;
    "line-pattern"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<import('maplibre-gl').ResolvedImageSpecification>;
    "line-gradient"?: import('maplibre-gl').ExpressionSpecification;
} | {
    "circle-radius"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "circle-color"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<import('maplibre-gl').ColorSpecification>;
    "circle-blur"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "circle-opacity"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "circle-translate"?: import('maplibre-gl').PropertyValueSpecification<[number, number]>;
    "circle-translate-anchor"?: import('maplibre-gl').PropertyValueSpecification<"map" | "viewport">;
    "circle-pitch-scale"?: import('maplibre-gl').PropertyValueSpecification<"map" | "viewport">;
    "circle-pitch-alignment"?: import('maplibre-gl').PropertyValueSpecification<"map" | "viewport">;
    "circle-stroke-width"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "circle-stroke-color"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<import('maplibre-gl').ColorSpecification>;
    "circle-stroke-opacity"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
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
//# sourceMappingURL=paintPicker.d.ts.map
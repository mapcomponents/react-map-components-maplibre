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
    "fill-opacity-transition"?: import('maplibre-gl').TransitionSpecification;
    "fill-color"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<import('maplibre-gl').ColorSpecification>;
    "fill-color-transition"?: import('maplibre-gl').TransitionSpecification;
    "fill-outline-color"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<import('maplibre-gl').ColorSpecification>;
    "fill-outline-color-transition"?: import('maplibre-gl').TransitionSpecification;
    "fill-translate"?: import('maplibre-gl').PropertyValueSpecification<[number, number]>;
    "fill-translate-transition"?: import('maplibre-gl').TransitionSpecification;
    "fill-translate-anchor"?: import('maplibre-gl').PropertyValueSpecification<"map" | "viewport">;
    "fill-pattern"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<import('maplibre-gl').ResolvedImageSpecification>;
    "fill-pattern-transition"?: import('maplibre-gl').TransitionSpecification;
} | {
    "line-opacity"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "line-opacity-transition"?: import('maplibre-gl').TransitionSpecification;
    "line-color"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<import('maplibre-gl').ColorSpecification>;
    "line-color-transition"?: import('maplibre-gl').TransitionSpecification;
    "line-translate"?: import('maplibre-gl').PropertyValueSpecification<[number, number]>;
    "line-translate-transition"?: import('maplibre-gl').TransitionSpecification;
    "line-translate-anchor"?: import('maplibre-gl').PropertyValueSpecification<"map" | "viewport">;
    "line-width"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "line-width-transition"?: import('maplibre-gl').TransitionSpecification;
    "line-gap-width"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "line-gap-width-transition"?: import('maplibre-gl').TransitionSpecification;
    "line-offset"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "line-offset-transition"?: import('maplibre-gl').TransitionSpecification;
    "line-blur"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "line-blur-transition"?: import('maplibre-gl').TransitionSpecification;
    "line-dasharray"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<Array<number>>;
    "line-dasharray-transition"?: import('maplibre-gl').TransitionSpecification;
    "line-pattern"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<import('maplibre-gl').ResolvedImageSpecification>;
    "line-pattern-transition"?: import('maplibre-gl').TransitionSpecification;
    "line-gradient"?: import('maplibre-gl').ExpressionSpecification;
} | {
    "circle-radius"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "circle-radius-transition"?: import('maplibre-gl').TransitionSpecification;
    "circle-color"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<import('maplibre-gl').ColorSpecification>;
    "circle-color-transition"?: import('maplibre-gl').TransitionSpecification;
    "circle-blur"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "circle-blur-transition"?: import('maplibre-gl').TransitionSpecification;
    "circle-opacity"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "circle-opacity-transition"?: import('maplibre-gl').TransitionSpecification;
    "circle-translate"?: import('maplibre-gl').PropertyValueSpecification<[number, number]>;
    "circle-translate-transition"?: import('maplibre-gl').TransitionSpecification;
    "circle-translate-anchor"?: import('maplibre-gl').PropertyValueSpecification<"map" | "viewport">;
    "circle-pitch-scale"?: import('maplibre-gl').PropertyValueSpecification<"map" | "viewport">;
    "circle-pitch-alignment"?: import('maplibre-gl').PropertyValueSpecification<"map" | "viewport">;
    "circle-stroke-width"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "circle-stroke-width-transition"?: import('maplibre-gl').TransitionSpecification;
    "circle-stroke-color"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<import('maplibre-gl').ColorSpecification>;
    "circle-stroke-color-transition"?: import('maplibre-gl').TransitionSpecification;
    "circle-stroke-opacity"?: import('maplibre-gl').DataDrivenPropertyValueSpecification<number>;
    "circle-stroke-opacity-transition"?: import('maplibre-gl').TransitionSpecification;
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
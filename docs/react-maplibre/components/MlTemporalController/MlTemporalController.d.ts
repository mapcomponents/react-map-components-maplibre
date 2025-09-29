import { default as React } from '../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
import { FeatureCollection } from 'geojson';
import { CircleLayerSpecification, FillLayerSpecification, LineLayerSpecification, SymbolLayoutProps, SymbolPaintProps } from 'maplibre-gl';
import { useLayerProps } from '../../hooks/useLayer';
export interface MlTemporalControllerProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * Id of an existing layer in the mapLibre instance to help specify the layer order.
     * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
     */
    insertBeforeLayer?: string;
    /**
     * GeoJSON data that is supposed to be rendered by this component.
     */
    geojson: FeatureCollection;
    /**
     * If true,the component creates and loads a MlGeoJsonLayer to show the data.
     */
    ownLayer?: boolean;
    /**
     * MapLibre attribution shown in the bottom right of the map, if this layer is visible
     */
    attribution?: string;
    /**
     * Type of the layer that will be added to the MapLibre instance.
     * Possible values: "line", "circle", "fill"
     */
    type?: 'fill' | 'line' | 'circle';
    /**
     * Property field where the time informations is available.
     */
    timeField: string;
    /**
     * Lowest time value to be shown in the time line.
     * By default, it is set to the lowest value in the time field.
     */
    minVal?: number;
    /**
     *When true, a label layer will be added by the component. In that case, the "labelField" propertie is mandatory.
     */
    label?: boolean;
    /**
     * Property field where the label information is available.
     */
    labelField?: string;
    /**
     * Highest time value to be shown in the time line.
     * By default, it is set to the highest value in the time field.
     */
    maxVal?: number;
    /**
     * the value at which the component is to be loaded.
     * If not specified, the component starts at the minimum value.
     */
    initialVal?: number;
    /**
     * When true, the features will be accumulated in the map.
     * This option ist by default false.
     */
    accumulate?: boolean;
    /**
     * When true, the component will fit the map bounds to the shown features.
     * This option ist by default true.
     */
    fitBounds?: boolean;
    /**
     * Boolean value that disables and enables the controls drawer.
     */
    showControls?: boolean;
    /**
     * Paint property object for the features layer.
     * Possible props depend on the layer type.
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#line
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
     */
    paint?: CircleLayerSpecification['paint'] | FillLayerSpecification['paint'] | LineLayerSpecification['paint'];
    /**
     * Sets the color of the features rendered by this component.
     */
    featuresColor?: string;
    /**
     * How many units the timeline runs through at each step.
     * By default it is set to 1.
     */
    step?: number;
    /**
     *  The time between each addition to the counter, expressed in milliseconds.
     *  By default, 200 ms.
     */
    interval?: number;
    /**
     * A numeric value that sets how many steps before the feature starts to appear.
     * By default it is set to 5 steps.
     */
    fadeIn?: number;
    /**
     * A numeric value that sets how many steps the feature fades out after it proper time value.
     * By default it is set to 5 steps.
     */
    fadeOut?: number;
    /**
     * Sets the color of the features rendered by this component.
     */
    labelColor?: string;
    /**
     * Layout property object, that is passed to the labels layer.
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#symbol
     */
    labelLayout?: SymbolLayoutProps;
    /**
     * Paint property object for the features layer.
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#symbol
     */
    labelPaint?: SymbolPaintProps;
    /**
     * Hover event handler that is executed whenever a geometry rendered by this component is hovered.
     */
    /**
     * A numeric value that sets how many steps before the labels start to appear.
     * By default it is set to 5 steps.
     */
    labelFadeIn?: number;
    /**
     * A numeric value that sets how many steps the labels fade out after their proper time value.
     * By default it is set to 5 steps.
     */
    labelFadeOut?: number;
    /**
     * If true, the current time value will be displayed in the controlls panel.
     */
    displayCurrentValue?: boolean;
    /**
     * Click event handler that is executed whenever a geometry rendered by this component is clicked.
     */
    onClick?: useLayerProps['onClick'];
    /**
     * Click event handler that is executed whenever a geometry rendered by this component is hovered.
     */
    onHover?: useLayerProps['onHover'];
    /**
     * Leave event handler that is executed whenever a geometry rendered by this component is
     * left/unhovered.
     */
    onLeave?: useLayerProps['onLeave'];
    /**
     * Callback function defined by the user to recive the current time value and paint property in the parent component.
     */
    onStateChange?: React.Dispatch<React.SetStateAction<TemporalControllerValues | undefined>>;
}
/**
 * Select a GeoJSON object to be displayed in a temporal line.
 *@component
 */
export interface TemporalControllerValues {
    current: number;
    paint: CircleLayerSpecification['paint'] | FillLayerSpecification['paint'] | LineLayerSpecification['paint'];
}
declare const MlTemporalController: ({ mapId, insertBeforeLayer, geojson, ownLayer, attribution, type, timeField, minVal, maxVal, initialVal, accumulate, fitBounds, paint, featuresColor, step, interval, fadeIn, fadeOut, label, labelColor, labelField, labelFadeIn, labelFadeOut, displayCurrentValue, onClick, onHover, onLeave, onStateChange, }: MlTemporalControllerProps) => import("react/jsx-runtime").JSX.Element;
export default MlTemporalController;
//# sourceMappingURL=MlTemporalController.d.ts.map
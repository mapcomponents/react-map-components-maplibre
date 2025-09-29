import { ControlPosition, CustomLayerInterface, IControl, LayerSpecification, Map, Map as MapType, MapEventType, MapLayerEventType, MapOptions as MapOptionsType, SourceSpecification, Style, StyleImageInterface, StyleImageMetadata } from 'maplibre-gl';
type WrapperEventArgArray = [MapLibreGlWrapperEventName, MapLibreGlWrapperEventHandlerType];
type EventArgArray = [
    keyof MapLayerEventType | keyof MapEventType,
    string | ((arg0: unknown) => void),
    ((arg0: unknown) => void)?
];
type LayerState = {
    id: string;
    type: string;
    visible: boolean;
    baseLayer: boolean;
};
type ViewportState = {
    center: {
        lng: number;
        lat: number;
    };
    zoom: number;
    bearing: number;
    pitch: number;
};
/**
 * Creates a MapLibre-gl-js instance and offers all of the native MapLibre functions and properties as well as additional functionality such as element registration & cleanup and more events.
 *
 * @param {object} props
 *
 * @class
 */
interface MapLibreGlWrapper extends MapType {
    addImage: (id: string, image: HTMLImageElement | ImageBitmap | ImageData | {
        width: number;
        height: number;
        data: Uint8Array | Uint8ClampedArray;
    } | StyleImageInterface, key?: Partial<StyleImageMetadata> | string | undefined, componentId?: string | undefined) => this;
    addLayer: (layer: (LayerSpecification & {
        source?: string | SourceSpecification | undefined;
    }) | (CustomLayerInterface & {
        source?: string | SourceSpecification | undefined;
    }), beforeId?: string | undefined, componentId?: string | undefined) => this;
    cancelled: boolean;
}
interface MapLibreGlWrapperEventHandlers {
    layerchange: {
        handler: (ev: unknown) => void;
        options?: object | string;
    }[];
    viewportchange: {
        handler: (ev: unknown) => void;
        options?: object | string;
    }[];
    addsource: {
        handler: (ev: unknown, wrapper?: MapLibreGlWrapper, data?: {
            [source_id: string]: string;
        }) => void;
    }[];
    addlayer: {
        handler: (ev: unknown) => void;
        options?: object | string;
    }[];
}
export type MapLibreGlWrapperEventHandlerType = MapLibreGlWrapperEventHandlers['layerchange'][number]['handler'] | MapLibreGlWrapperEventHandlers['viewportchange'][number]['handler'] | MapLibreGlWrapperEventHandlers['addsource'][number]['handler'] | MapLibreGlWrapperEventHandlers['addlayer'][number]['handler'];
export type MapLibreGlEventName = keyof MapLayerEventType | keyof MapEventType | string;
export type MapLibreGlWrapperEventName = keyof MapLibreGlWrapperEventHandlers;
declare class MapLibreGlWrapper {
    [key: string]: any;
    registeredElements: {
        [key: string]: {
            layers: [string?];
            sources: [string?];
            images: [string?];
            controls: [(IControl | unknown)?];
            events: [EventArgArray?];
            wrapperEvents: [WrapperEventArgArray?];
        };
    };
    baseLayers: [string?];
    firstSymbolLayer: string | undefined;
    eventHandlers: MapLibreGlWrapperEventHandlers;
    wrapper: {
        on: (eventName: MapLibreGlWrapperEventName, handler: MapLibreGlWrapperEventHandlerType, options?: object | string, componentId?: string) => void;
        off: (type: string, handler: MapLibreGlWrapperEventHandlerType) => void;
        fire: (eventName: string, context?: unknown) => void;
        layerState: LayerState[];
        layerStateString: string;
        oldLayerStateStrings: object;
        buildLayerObject: (layer: ReturnType<Style['getLayer']>) => LayerState | undefined;
        buildLayerObjects: () => LayerState[];
        refreshLayerState: () => void;
        viewportState: ViewportState;
        viewportStateString: string;
        oldViewportStateString: string;
        getViewport: () => {
            center: {
                lng: number;
                lat: number;
            };
            zoom: number;
            bearing: number;
            pitch: number;
        };
        refreshViewport: () => void;
    };
    initRegisteredElements: (componentId: string, force?: boolean | undefined) => void;
    addNativeMaplibreFunctionsAndProps: () => void;
    map: MapType;
    style: Style;
    styleJson: object;
    addSource: (id: string, source: SourceSpecification, componentId?: string | undefined) => this;
    addControl: (control: IControl | unknown, position?: ControlPosition | undefined, componentId?: string | undefined) => this;
    on: (type: MapLibreGlEventName, layerId: string | ((ev: unknown) => void), handler?: ((ev: MapEventType & unknown) => Map | void) | string, componentId?: string | undefined) => this;
    cleanup: (componentId: string) => void;
    constructor(props: {
        mapOptions: MapOptionsType;
        onReady: (map: MapType, context: unknown) => void;
    });
}
export default MapLibreGlWrapper;
export type { LayerState, ViewportState };
//# sourceMappingURL=MapLibreGlWrapper.d.ts.map
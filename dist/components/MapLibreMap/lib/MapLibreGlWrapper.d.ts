import { Map, IControl, MapOptions as MapOptionsType } from "!maplibre-gl";
declare type EventArgArray = [string, string | Function, Function?];
declare type LayerState = {
    id: string;
    type: string;
    visible: boolean;
    baseLayer: boolean;
};
declare type ViewportState = {
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
declare class MapLibreGlWrapper {
    registeredElements: {
        [key: string]: {
            layers: [string?];
            sources: [string?];
            images: [string?];
            controls: [IControl?];
            events: [EventArgArray?];
            wrapperEvents: [EventArgArray?];
        };
    };
    baseLayers: [string?];
    firstSymbolLayer: string | undefined;
    eventHandlers: {
        layerchange: [Function?];
        viewportchange: [Function?];
    };
    wrapper: {
        on: Function;
        off: Function;
        fire: Function;
        layerState: [LayerState?];
        layerStateString: string;
        oldLayerStateStrings: object;
        buildLayerObject: Function;
        buildLayerObjects: Function;
        refreshLayerState: Function;
        viewportState: ViewportState;
        viewportStateString: string;
        oldViewportStateString: string;
        getViewport: Function;
        refreshViewport: Function;
    };
    initRegisteredElements: Function;
    addNativeMaplibreFunctionsAndProps: Function;
    map: Map;
    style: object;
    styleJson: object;
    addLayer: Function;
    addSource: Function;
    addControl: Function;
    addImage: Function;
    on: Function;
    cleanup: Function;
    constructor(props: {
        mapOptions: MapOptionsType;
        onReady: Function;
    });
}
export default MapLibreGlWrapper;
export type { LayerState, ViewportState };

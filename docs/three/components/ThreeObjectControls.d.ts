export interface ThreeObjectControlsProps {
    showLayer: boolean;
    setShowLayer: (show: boolean) => void;
    scale: number;
    setScale: (scale: number) => void;
    rotation: {
        x: number;
        y: number;
        z: number;
    };
    setRotation: (rotation: {
        x: number;
        y: number;
        z: number;
    }) => void;
    useMapCoords: boolean;
    setUseMapCoords: (use: boolean) => void;
    mapPosition: {
        lng: number;
        lat: number;
    };
    setMapPosition: (position: {
        lng: number;
        lat: number;
    }) => void;
    altitude: number;
    setAltitude: (altitude: number) => void;
    position: {
        x: number;
        y: number;
        z: number;
    };
    setPosition: (position: {
        x: number;
        y: number;
        z: number;
    }) => void;
    enableTransformControls?: boolean;
    setEnableTransformControls?: (enable: boolean) => void;
    transformMode?: 'translate' | 'rotate' | 'scale';
    setTransformMode?: (mode: 'translate' | 'rotate' | 'scale') => void;
    layerName?: string;
}
export declare const ThreeObjectControls: ({ showLayer, setShowLayer, scale, setScale, rotation, setRotation, useMapCoords, setUseMapCoords, mapPosition, setMapPosition, altitude, setAltitude, position, setPosition, enableTransformControls, setEnableTransformControls, transformMode, setTransformMode, layerName, }: ThreeObjectControlsProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ThreeObjectControls.d.ts.map
import { CSSProperties } from 'react';
interface MlNavigationCompassProps {
    /**
     * Id of the target MapLibre instance in mapHook
     */
    mapId?: string;
    /**
     * The layerId of an existing layer this layer should be rendered visually beneath
     * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
     */
    insertBeforeLayer?: string;
    /**
     * Style object to adjust css definitions of the component.
     */
    style?: CSSProperties;
    /**
     * Style object to adjust css definitions of the background.
     */
    backgroundStyle?: CSSProperties;
    /**
     * Style object to adjust css definitions of the compass needle.
     */
    needleStyle?: CSSProperties;
}
/**
 * Navigation component that displays a compass component which indicates the current oriantation of the map it is registered for and offers controls to turn the bearing 90° left/right or reset north to point up.
 *
 * All style props are applied using @mui/material/styled to allow more complex css selectors.
 *
 * @component
 */
declare const MlNavigationCompass: (props: MlNavigationCompassProps) => JSX.Element;
export default MlNavigationCompass;

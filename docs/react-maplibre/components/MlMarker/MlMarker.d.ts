import { default as React } from '../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
export interface MlMarkerProps {
    /** ID of the map to add the marker to */
    mapId?: string;
    /** Layer ID before which to insert the marker */
    insertBeforeLayer?: string;
    /** Longitude of the marker position */
    lng: number;
    /** Latitude of the marker position */
    lat: number;
    /** HTML content for the marker popup */
    content?: string;
    /** CSS properties to apply to the marker dot */
    markerStyle?: React.CSSProperties;
    /** CSS properties to apply to the content container */
    containerStyle?: React.CSSProperties;
    /** CSS properties to apply to the iframe element */
    iframeStyle?: React.CSSProperties;
    /** CSS properties to apply to the body of the iframe */
    iframeBodyStyle?: React.CSSProperties;
    /** Offset in pixels between the marker and its content */
    contentOffset?: number;
    /** Whether mouse events pass through the marker content */
    passEventsThrough?: boolean;
    /** Anchor position of the marker relative to its coordinates */
    anchor?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
declare const MlMarker: ({ passEventsThrough, contentOffset, ...props }: MlMarkerProps) => React.ReactPortal | null;
export default MlMarker;
//# sourceMappingURL=MlMarker.d.ts.map
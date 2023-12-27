import React from 'react';
import './style.css';
export interface MlLayerSwipeProps {
    /**
     * Id of the first MapLibre instance.
     */
    map1Id: string;
    /**
     * Id of the second MapLibre instance.
     */
    map2Id: string;
    /**
     * object (React.CSSProperties) that is added to the button default style
     */
    buttonStyle: React.CSSProperties | undefined;
}
/**
 *	creates a split view of 2 synchronised maplibre instances
 */
declare const MlLayerSwipe: {
    (props: MlLayerSwipeProps): JSX.Element;
    defaultProps: {
        buttonStyle: {};
    };
};
export default MlLayerSwipe;

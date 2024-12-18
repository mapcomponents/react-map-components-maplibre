/// <reference types="react" />
import PropTypes from 'prop-types';
/**
 * Renders obj or gltf 3D Models on the MapLibreMap referenced by props.mapId
 *
 * @component
 */
export interface MlThreeJsLayerProps {
    mapId?: string;
    init?: () => void;
    onDone?: () => void;
}
declare const MlThreeJsLayer: {
    (props: MlThreeJsLayerProps): JSX.Element;
    propTypes: {
        /**
         * Id of the target MapLibre instance in mapContext
         */
        mapId: PropTypes.Requireable<string>;
        /**
         * function that gets called when initialized
         */
        init: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * function that gets called when models are loaded
         */
        onDone: PropTypes.Requireable<(...args: any[]) => any>;
    };
};
export default MlThreeJsLayer;

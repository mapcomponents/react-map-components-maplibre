export default MlThreeJsLayer;
/**
 * Renders obj or gltf 3D Models on the MapLibreMap referenced by props.mapId
 *
 * @component
 */
declare function MlThreeJsLayer(props: any): JSX.Element;
declare namespace MlThreeJsLayer {
    namespace propTypes {
        const mapId: PropTypes.Requireable<string>;
        const init: PropTypes.Requireable<(...args: any[]) => any>;
        const onDone: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";

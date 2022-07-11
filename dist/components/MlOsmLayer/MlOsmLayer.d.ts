export default MlOsmLayer;
/**
 * Adds a standard OSM tile layer to the maplibre-gl instancereference by
 * props.mapId
 *
 * @component
 */
declare function MlOsmLayer(props: any): JSX.Element;
declare namespace MlOsmLayer {
    namespace propTypes {
        const mapId: PropTypes.Requireable<string>;
        const idPrefix: PropTypes.Requireable<string>;
        const sourceOptions: PropTypes.Requireable<object>;
        const layerOptions: PropTypes.Requireable<object>;
        const insertBeforeLayer: PropTypes.Requireable<string>;
    }
}
import PropTypes from "prop-types";

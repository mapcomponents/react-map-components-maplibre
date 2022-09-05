export default MlWmsFeatureInfoPopup;
/**
 * TODO: Add short & useful description
 *
 * @param {object} props
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 *
 * @component
 */
declare function MlWmsFeatureInfoPopup(props: {
    mapId: string;
}): JSX.Element;
declare namespace MlWmsFeatureInfoPopup {
    namespace defaultProps {
        const mapId: undefined;
    }
    namespace propTypes {
        const mapId_1: PropTypes.Requireable<string>;
        export { mapId_1 as mapId };
    }
}
import PropTypes from "prop-types";

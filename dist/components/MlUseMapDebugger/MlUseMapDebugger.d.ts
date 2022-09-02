export default MlUseMapDebugger;
/**
 * Renders a collapsable top-drawer containing live map debug information
 *
 * @param {object} props
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 *
 * @component
 */
declare function MlUseMapDebugger(props: {
    mapId: string;
}): JSX.Element;
declare namespace MlUseMapDebugger {
    namespace defaultProps {
        const mapId: undefined;
    }
    namespace propTypes {
        const mapId_1: PropTypes.Requireable<string>;
        export { mapId_1 as mapId };
    }
}
import PropTypes from "prop-types";

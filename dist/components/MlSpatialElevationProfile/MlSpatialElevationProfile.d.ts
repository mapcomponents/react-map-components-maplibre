export default MlSpatialElevationProfile;
/**
 * MlSpatialElevationProfile returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 *
 * @component
 */
declare function MlSpatialElevationProfile(props: any): JSX.Element;
declare namespace MlSpatialElevationProfile {
    namespace defaultProps {
        const elevationFactor: number;
    }
    namespace propTypes {
        export const mapId: PropTypes.Requireable<string>;
        export const idPrefix: PropTypes.Requireable<string>;
        const elevationFactor_1: PropTypes.Requireable<number>;
        export { elevationFactor_1 as elevationFactor };
        export const insertBeforeLayer: PropTypes.Requireable<string>;
    }
}
import PropTypes from "prop-types";

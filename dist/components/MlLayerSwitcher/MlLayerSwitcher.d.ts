export default MlLayerSwitcher;
/**
 * @component
 *
 *
 */
declare function MlLayerSwitcher(props: any): JSX.Element;
declare namespace MlLayerSwitcher {
    namespace propTypes {
        const baseSourceConfig: PropTypes.Requireable<PropTypes.InferProps<{
            label: PropTypes.Requireable<string>;
            layers: PropTypes.Requireable<(PropTypes.InferProps<{
                layerId: PropTypes.Validator<string>;
                src: PropTypes.Requireable<string>;
                label: PropTypes.Validator<string>;
            }> | null | undefined)[]>;
        }>>;
        const detailLayerConfig: PropTypes.Requireable<PropTypes.InferProps<{
            label: PropTypes.Requireable<string>;
            layers: PropTypes.Requireable<(PropTypes.InferProps<{
                layerId: PropTypes.Validator<string>;
                src: PropTypes.Requireable<string>;
                label: PropTypes.Validator<string>;
                linkedTo: PropTypes.Requireable<string>;
            }> | null | undefined)[]>;
        }>>;
        const mapId: PropTypes.Requireable<string>;
    }
}
import PropTypes from "prop-types";

import PropTypes from "prop-types";
import { LayerState, ViewportState } from "../components/MapLibreMap/lib/MapLibreGlWrapper";
type useMapStateType = {
    layers: (LayerState | undefined)[];
    viewport: ViewportState | undefined;
};
/**
 * React hook that allows subscribing to map state changes
 *
 * @component
 */
declare function useMapState(props: {
    mapId?: string;
    watch?: {
        layers?: boolean;
        sources?: boolean;
        viewport?: boolean;
    };
    filter?: {
        includeBaseLayers?: boolean;
        matchLayerIds?: RegExp | string;
        matchSourceIds?: RegExp | string;
    };
}): useMapStateType;
declare namespace useMapState {
    var defaultProps: {
        mapId: undefined;
        watch: {
            layers: boolean;
            sources: boolean;
            viewport: boolean;
        };
        filter: {
            includeBaseLayers: boolean;
        };
    };
    var propTypes: {
        /**
         * Id of the target MapLibre instance in mapContext
         */
        mapId: PropTypes.Requireable<string>;
        /**
         * Defines map Resources to watch
         */
        watch: PropTypes.Requireable<PropTypes.InferProps<{
            layers: PropTypes.Requireable<boolean>;
            sources: PropTypes.Requireable<boolean>;
            viewport: PropTypes.Requireable<boolean>;
        }>>;
        /**
         * Filter string or RegExp to more explicitly define the elements watched and increase performance
         * strings will be matched using layerId.includes(matchString)
         * RegExps will be matched using matchRegExp.test(layerId)
         */
        filter: PropTypes.Requireable<PropTypes.InferProps<{
            includeBaseLayers: PropTypes.Requireable<boolean>;
            matchLayerIds: PropTypes.Requireable<NonNullable<string | RegExp | null | undefined>>;
            matchSourceIds: PropTypes.Requireable<NonNullable<string | RegExp | null | undefined>>;
        }>>;
    };
}
export default useMapState;

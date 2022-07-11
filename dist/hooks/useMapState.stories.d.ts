export default storyoptions;
export const ViewportOnly: any;
export const IncludeBaseLayers: any;
export const MatchLayerIdString: any;
export const MatchLayerIdRegexp: any;
export const NonBaseLayersOnly: any;
declare namespace storyoptions {
    export const title: string;
    export { useMapState as component };
    export const argTypes: {};
    export { mapContextDecorator as decorators };
}
import useMapState from "./useMapState";
import mapContextDecorator from "../decorators/MapContextDecorator";

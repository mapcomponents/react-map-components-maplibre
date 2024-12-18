export default storyoptions;
export const ExampleConfig: any;
declare namespace storyoptions {
    export const title: string;
    export { MlTransitionGeoJsonLayer as component };
    export namespace argTypes {
        const url: {};
        const layer: {};
    }
    export { mapContextDecorator as decorators };
}
import MlTransitionGeoJsonLayer from "./MlTransitionGeoJsonLayer";
import mapContextDecorator from "../../decorators/MapContextDecorator";

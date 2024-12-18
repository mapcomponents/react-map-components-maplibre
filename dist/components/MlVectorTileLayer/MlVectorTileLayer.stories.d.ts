export default storyoptions;
export const ExampleConfig: any;
declare namespace storyoptions {
    export const title: string;
    export { MlVectorTileLayer as component };
    export namespace argTypes {
        const url: {};
        const layer: {};
    }
    export { mapContextDecorator as decorators };
}
import MlVectorTileLayer from "./MlVectorTileLayer";
import mapContextDecorator from "../../decorators/MapContextDecorator";

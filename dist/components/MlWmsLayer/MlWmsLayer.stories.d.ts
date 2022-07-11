export default storyoptions;
export const ExampleConfig: any;
declare namespace storyoptions {
    export const title: string;
    export { MlWmsLayer as component };
    export namespace argTypes {
        const url: {};
        const layer: {};
    }
    export { mapContextDecorator as decorators };
}
import MlWmsLayer from "./MlWmsLayer";
import mapContextDecorator from "../../decorators/MapContextDecorator";

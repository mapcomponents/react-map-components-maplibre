export default storyoptions;
export const ExampleConfig: any;
declare namespace storyoptions {
    export const title: string;
    export { MlLayerSwitcher as component };
    export namespace argTypes {
        const url: {};
        const layer: {};
    }
    export { mapContextDecorator as decorators };
}
import MlLayerSwitcher from "./MlLayerSwitcher";
import mapContextDecorator from "../../decorators/MapContextDecorator";

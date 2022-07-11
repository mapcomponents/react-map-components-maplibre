export default storyoptions;
export const Toolbar: any;
export const Overlay: any;
declare namespace storyoptions {
    export const title: string;
    export { MlScaleReference as component };
    export namespace argTypes {
        const url: {};
        const layer: {};
    }
    export { mapContextDecorator as decorators };
}
import MlScaleReference from "./MlScaleReference";
import mapContextDecorator from "../../decorators/MapContextDecorator";

export default storyoptions;
export const ExampleConfig: any;
declare namespace storyoptions {
    export const title: string;
    export { MlNavigationTools as component };
    export namespace argTypes {
        const url: {};
        const layer: {};
    }
    export { mapContextDecorator as decorators };
}
import MlNavigationTools from "./MlNavigationTools";
import mapContextDecorator from "../../decorators/MapContextDecorator";

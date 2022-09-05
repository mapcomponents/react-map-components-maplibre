export default storyoptions;
export const ExampleConfig: any;
declare namespace storyoptions {
    export const title: string;
    export { MlWmsLoader as component };
    export namespace argTypes {
        const url: {};
        const layer: {};
    }
    export { mapContextDecorator as decorators };
}
import MlWmsLoader from "./MlWmsLoader";
import mapContextDecorator from "../../decorators/MapContextDecorator";

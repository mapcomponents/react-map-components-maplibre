export default storyoptions;
export const ExampleConfig: any;
declare namespace storyoptions {
    export const title: string;
    export { MlUseMapDebugger as component };
    export namespace argTypes {
        const url: {};
        const layer: {};
    }
    export { mapContextDecorator as decorators };
}
import MlUseMapDebugger from "./MlUseMapDebugger";
import mapContextDecorator from "../../decorators/MapContextDecorator";

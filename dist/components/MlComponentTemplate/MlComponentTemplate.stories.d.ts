export default storyoptions;
export const ExampleConfig: any;
declare namespace storyoptions {
    export const title: string;
    export { MlComponentTemplate as component };
    export const argTypes: {};
    export { mapContextDecorator as decorators };
}
import MlComponentTemplate from "./MlComponentTemplate";
import mapContextDecorator from "../../decorators/MapContextDecorator";

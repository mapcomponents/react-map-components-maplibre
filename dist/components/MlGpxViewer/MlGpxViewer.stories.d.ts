export default storyoptions;
export const ExampleConfig: any;
declare namespace storyoptions {
    export const title: string;
    export { MlGpxViewer as component };
    export namespace argTypes {
        namespace options {
            namespace control {
                const type: string;
            }
        }
    }
    export { mapContextDecorator as decorators };
}
import MlGpxViewer from "./MlGpxViewer";
import mapContextDecorator from "../../decorators/MapContextDecorator";

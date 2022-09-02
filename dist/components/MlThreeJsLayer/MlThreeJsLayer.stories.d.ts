export default storyoptions;
export const ExampleConfig: any;
declare namespace storyoptions {
    export const title: string;
    export { MlThreeJsLayer as component };
    export namespace argTypes {
        namespace options {
            namespace control {
                const type: string;
            }
        }
    }
    export { mapContextDecorator as decorators };
}
import MlThreeJsLayer from "./MlThreeJsLayer";
import mapContextDecorator from "../../decorators/MapContextDecorator";

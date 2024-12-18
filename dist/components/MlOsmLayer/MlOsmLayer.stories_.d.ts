export default storyoptions;
export const ExampleConfig: any;
declare namespace storyoptions {
    export const title: string;
    export { MlOsmLayer as component };
    export namespace argTypes {
        namespace options {
            namespace control {
                const type: string;
            }
        }
    }
    export { mapContextDecorator as decorators };
}
import MlOsmLayer from "./MlOsmLayer";
import mapContextDecorator from "../../decorators/MapContextDecorator";

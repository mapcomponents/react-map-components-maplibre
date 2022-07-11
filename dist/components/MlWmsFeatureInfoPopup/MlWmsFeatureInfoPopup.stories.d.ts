export default storyoptions;
export const ExampleConfig: any;
declare namespace storyoptions {
    export const title: string;
    export { MlWmsFeatureInfoPopup as component };
    export namespace argTypes {
        const url: {};
        const layer: {};
    }
    export { mapContextDecorator as decorators };
}
import MlWmsFeatureInfoPopup from "./MlWmsFeatureInfoPopup";
import mapContextDecorator from "../../decorators/MapContextDecorator";

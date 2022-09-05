export default storyoptions;
export const EditPolygon: any;
export const EditPoint: any;
export const EditLineString: any;
export const DrawPolygon: any;
export const DrawPoint: any;
export const DrawLineString: any;
declare namespace storyoptions {
    export const title: string;
    export { MlFeatureEditor as component };
    export const argTypes: {};
    export { mapContextDecorator as decorators };
}
import MlFeatureEditor from "./MlFeatureEditor";
import mapContextDecorator from "../../decorators/MapContextDecorator";

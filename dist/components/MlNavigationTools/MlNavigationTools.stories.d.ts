export default storyoptions;
export const DefaultConfig: any;
export const No3dButton: any;
export const ShowCenterLocationButton: any;
export const AlterToolPosition: any;
export const NoZoomButtons: any;
export const NoFollowGpsButton: any;
export const CustomButton: any;
declare namespace storyoptions {
    export const title: string;
    export { MlNavigationTools as component };
    export namespace argTypes {
        const url: {};
        const layer: {};
    }
    export { noNavToolsDecorator as decorators };
}
import MlNavigationTools from "./MlNavigationTools";
import noNavToolsDecorator from "../../decorators/NoNavToolsDecorator";

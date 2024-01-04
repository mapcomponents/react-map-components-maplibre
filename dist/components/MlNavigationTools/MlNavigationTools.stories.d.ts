/// <reference types="react" />
import { MlNavigationToolsProps } from './MlNavigationTools';
declare const storyoptions: {
    title: string;
    component: {
        (props: MlNavigationToolsProps): JSX.Element;
        defaultProps: {
            mapId: undefined;
            show3DButton: boolean;
            showFollowGpsButton: boolean;
            showCenterLocationButton: boolean;
            showZoomButtons: boolean;
        };
    };
    argTypes: {
        url: {};
        layer: {};
    };
    decorators: ((Story: any, context: any) => JSX.Element)[];
};
export default storyoptions;
export declare const DefaultConfig: any;
export declare const No3dButton: any;
export declare const ShowCenterLocationButton: any;
export declare const AlternativePosition: any;
export declare const NoZoomButtons: any;
export declare const NoFollowGpsButton: any;
export declare const CustomButton: any;
export declare const catalogueDemo: any;

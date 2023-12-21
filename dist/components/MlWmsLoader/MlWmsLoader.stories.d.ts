/// <reference types="react" />
declare const storyoptions: {
    title: string;
    component: {
        (props: import("./MlWmsLoader").MlWmsLoaderProps): JSX.Element;
        defaultProps: {
            mapId: undefined;
            url: string;
            urlParameters: {
                SERVICE: string;
                VERSION: string;
                REQUEST: string;
            };
            wmsUrlParameters: {
                TRANSPARENT: string;
            };
            featureInfoEnabled: boolean;
            zoomToExtent: boolean;
            showDeleteButton: boolean;
        };
    };
    argTypes: {
        url: {};
        layer: {};
    };
    decorators: ((Story: any, context: any) => JSX.Element)[];
};
export default storyoptions;
export declare const ExampleConfig: any;
export declare const ExampleFixedConfig: any;

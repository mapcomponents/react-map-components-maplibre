/// <reference types="react" />
declare const storyoptions: {
    title: string;
    component: {
        (props: import("./MlGpxViewer").MlGpxViewerProps): JSX.Element;
        defaultProps: {};
    };
    argTypes: {
        options: {
            control: {
                type: string;
            };
        };
    };
    decorators: ((Story: any, context: any) => JSX.Element)[];
};
export default storyoptions;
export declare const ExampleConfig: any;

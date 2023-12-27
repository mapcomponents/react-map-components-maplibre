/// <reference types="react" />
declare const storyoptions: {
    title: string;
    component: {
        (props: import("./MlSketchTool").MlSketchToolProps): JSX.Element;
        defaultProps: {
            mapId: undefined;
            buttonStyleOverride: {};
        };
    };
    argTypes: {};
    decorators: ((Story: any, context: any) => JSX.Element)[];
};
export default storyoptions;
export declare const ExampleConfig: any;

/// <reference types="react" />
declare const storyoptions: {
    title: string;
    component: {
        (props: import("./MlShareMapState").MlShareMapStateProps): JSX.Element;
        defaultProps: {
            mapId: undefined;
        };
        propTypes: {
            mapId: import("prop-types").Requireable<string>;
        };
    };
    argTypes: {};
    decorators: ((Story: any, context: any) => JSX.Element)[];
};
export default storyoptions;
export declare const ExampleConfig: any;

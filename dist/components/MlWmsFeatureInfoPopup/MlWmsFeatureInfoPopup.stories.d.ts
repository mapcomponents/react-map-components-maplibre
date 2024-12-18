/// <reference types="react" />
declare const storyoptions: {
    title: string;
    component: {
        (props: {
            mapId: string;
        }): JSX.Element;
        defaultProps: {
            mapId: undefined;
        };
        propTypes: {
            mapId: import("prop-types").Requireable<string>;
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

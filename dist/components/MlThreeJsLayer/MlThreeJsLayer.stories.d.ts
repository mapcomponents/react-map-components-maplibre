/// <reference types="react" />
declare const storyoptions: {
    title: string;
    component: {
        (props: import("./MlThreeJsLayer").MlThreeJsLayerProps): JSX.Element;
        propTypes: {
            mapId: import("prop-types").Requireable<string>;
            init: import("prop-types").Requireable<(...args: any[]) => any>;
            onDone: import("prop-types").Requireable<(...args: any[]) => any>;
        };
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

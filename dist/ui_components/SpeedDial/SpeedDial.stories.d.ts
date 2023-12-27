/// <reference types="react" />
declare const storyoptions: {
    title: string;
    component: {
        (): JSX.Element;
        defaultProps: {
            mapId: undefined;
        };
    };
    argTypes: {};
    decorators: ((Story: any, context: any) => JSX.Element)[];
    parameters: {
        docs: {
            source: {
                type: string;
            };
        };
    };
};
export default storyoptions;
export declare const ExampleConfig: any;

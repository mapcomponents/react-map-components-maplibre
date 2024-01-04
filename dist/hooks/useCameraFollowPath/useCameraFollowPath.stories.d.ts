/// <reference types="react" />
declare const storyoptions: {
    title: string;
    component: {
        (props: import("./useCameraFollowPath").useCameraFollowPathProps): {
            play: () => void;
            reset: () => void;
        };
        defaultProps: {
            mapId: undefined;
            zoom: number;
        };
    };
    argTypes: {};
    decorators: ((Story: any, context: any) => JSX.Element)[];
};
export default storyoptions;
export declare const ExampleConfig: any;

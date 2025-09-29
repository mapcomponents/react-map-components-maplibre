declare const storyoptions: {
    title: string;
    component: {
        (props: import('./useCameraFollowPath').useCameraFollowPathProps): {
            play: () => void;
            reset: () => void;
        };
        defaultProps: {
            mapId: undefined;
            zoom: number;
        };
    };
    argTypes: {};
    decorators: import('@storybook/react-vite').Decorator[];
};
export default storyoptions;
export declare const ExampleConfig: any;
//# sourceMappingURL=useCameraFollowPath.stories.d.ts.map
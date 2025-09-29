declare const storyoptions: {
    title: string;
    component: {
        (props: import('./MlWmsLoader').MlWmsLoaderProps): import("react/jsx-runtime").JSX.Element;
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
    decorators: import('@storybook/react-vite').Decorator[];
};
export default storyoptions;
export declare const ExampleConfig: any;
export declare const ExampleFixedConfig: any;
//# sourceMappingURL=MlWmsLoader.stories.d.ts.map
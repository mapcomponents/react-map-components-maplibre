import { MapLibreMapProps } from './MapLibreMap';
declare const storyoptions: {
    title: string;
    component: import('../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react').FC<MapLibreMapProps> & {
        defaultProps: MapLibreMapProps;
    };
    argTypes: {
        options: {
            control: {
                type: string;
            };
        };
    };
    decorators: ((Story: React.FC, context?: import('@storybook/react-vite').StoryContext) => React.ReactElement)[];
    parameters: {
        sourceLink: string;
    };
};
export default storyoptions;
export declare const ExampleConfig: import('storybook/internal/csf').AnnotatedStoryFn<import('@storybook/react-vite').ReactRenderer, MapLibreMapProps>;
export declare const StyleChangeConfig: any;
//# sourceMappingURL=MapLibreMap.stories.d.ts.map
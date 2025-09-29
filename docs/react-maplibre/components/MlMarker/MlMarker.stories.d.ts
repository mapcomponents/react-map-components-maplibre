import { MlMarkerProps } from './MlMarker';
declare const storyoptions: {
    title: string;
    component: ({ passEventsThrough, contentOffset, ...props }: MlMarkerProps) => import('../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react').ReactPortal | null;
    decorators: import('@storybook/react-vite').Decorator[];
    parameters: {
        docs: {
            description: {
                component: string;
            };
        };
    };
    argTypes: {
        lng: {
            control: {
                type: string;
                step: number;
            };
        };
        lat: {
            control: {
                type: string;
                step: number;
            };
        };
        contentOffset: {
            control: {
                type: string;
                min: number;
                max: number;
                step: number;
            };
        };
        markerStyle: {
            control: {
                type: string;
            };
        };
        containerStyle: {
            control: {
                type: string;
            };
        };
        iframeStyle: {
            control: {
                type: string;
            };
        };
        iframeBodyStyle: {
            control: {
                type: string;
            };
        };
        passEventsThrough: {
            control: {
                type: string;
            };
        };
    };
};
export default storyoptions;
export declare const ExampleConfig: any;
export declare const CustomStyledMarker: any;
//# sourceMappingURL=MlMarker.stories.d.ts.map
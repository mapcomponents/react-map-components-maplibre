/// <reference types="react" />
import { MlFillExtrusionLayerProps } from './MlFillExtrusionLayer';
declare const storyoptions: {
    title: string;
    component: {
        (props: MlFillExtrusionLayerProps): JSX.Element;
        defaultProps: {
            mapId: undefined;
            paint: {
                "fill-extrusion-color": string;
                "fill-extrusion-height": {
                    property: string;
                    type: string;
                };
                "fill-extrusion-base": {
                    property: string;
                    type: string;
                };
                "fill-extrusion-opacity": number;
            };
        };
    };
    argTypes: {};
    decorators: ((Story: any, context: any) => JSX.Element)[];
};
export default storyoptions;
export declare const ExampleConfig: any;

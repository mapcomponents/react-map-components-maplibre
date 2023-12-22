/// <reference types="react" />
import { MlTemporalControllerProps } from './MlTemporalController';
declare const storyoptions: {
    title: string;
    component: {
        (props: MlTemporalControllerProps): JSX.Element;
        defaultProps: {
            mapId: undefined;
            ownLayer: boolean;
            type: string;
            step: number;
            interval: number;
            fadeIn: number;
            fadeOut: number;
            labelFadeIn: number;
            labelFadeOut: number;
            accumulate: boolean;
            fitBounds: boolean;
            label: boolean;
            attribution: string;
            displayCurrentValue: boolean;
        };
    };
    argTypes: {};
    decorators: ((Story: any, context: any) => JSX.Element)[];
    parameters: {
        sourceLink: string;
    };
};
export default storyoptions;
export declare const FillConfig: any;
export declare const CircleConfig: any;
export declare const LineConfig: any;
export declare const catalogueDemo: any;

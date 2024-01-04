import React from 'react';
export interface TemporalControllerPlayerProps {
    currentVal: number;
    isPlaying: boolean;
    step: number;
    interval: number;
    minVal: number;
    maxVal: number;
    returnCurrent: React.Dispatch<React.SetStateAction<number>>;
    returnPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    fadeIn: number;
    open: boolean;
    fadeOut: number;
    featuresColor: string;
    labels: boolean;
    labelColor: string;
    labelFadeIn: number;
    labelFadeOut: number;
    accumulate: boolean;
    display: boolean;
}
export default function TemporalControllerPlayer(props: TemporalControllerPlayerProps): JSX.Element;

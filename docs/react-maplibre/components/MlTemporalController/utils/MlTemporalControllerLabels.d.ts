import { SymbolLayerSpecification, SymbolLayoutProps } from 'maplibre-gl';
import { FeatureCollection } from 'geojson';
interface MlTemporalControllerLabelsProps {
    data: FeatureCollection;
    currentVal: number;
    fadeIn: number;
    fadeOut: number;
    step: number;
    labelField: string;
    labelColor: string;
    timeField: string;
    minVal: number;
    accumulate: boolean;
    isPlaying: boolean;
    labelLayout?: SymbolLayoutProps;
    labelPaint?: SymbolLayerSpecification;
}
export default function MlTemporalControllerLabels(props: MlTemporalControllerLabelsProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MlTemporalControllerLabels.d.ts.map
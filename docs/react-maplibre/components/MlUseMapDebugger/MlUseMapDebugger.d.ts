import { FC } from '../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
export interface MlUseMapDebuggerProps {
    mapId?: string;
    watch?: string[];
    filter?: {
        [key: string]: any;
    };
}
type MlUseMapDebuggerComponent = FC<MlUseMapDebuggerProps>;
/**
 * Renders a collapsible top-drawer containing live map debug information
 *
 * @param {MlUseMapDebuggerProps} props
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 *
 * @component
 */
declare const MlUseMapDebugger: MlUseMapDebuggerComponent;
export default MlUseMapDebugger;
//# sourceMappingURL=MlUseMapDebugger.d.ts.map
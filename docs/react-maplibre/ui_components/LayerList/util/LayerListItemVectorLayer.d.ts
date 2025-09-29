import { MlVectorTileLayerProps } from '../../../components/MlVectorTileLayer/MlVectorTileLayer';
export declare const ListItemStyled: import('@emotion/styled').StyledComponent<import('@mui/material').ListItemOwnProps & import('@mui/material/OverridableComponent').CommonProps & Omit<import('../../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react').DetailedHTMLProps<import('../../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react').LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "style" | "components" | "alignItems" | "dense" | "classes" | "className" | "children" | "sx" | "componentsProps" | "slotProps" | "slots" | "disableGutters" | "divider" | "disablePadding" | "ContainerComponent" | "ContainerProps" | "secondaryAction"> & import('@mui/system').MUIStyledCommonProps<import('@mui/material').Theme>, {}, {}>;
export declare const CheckboxListItemIcon: import('@emotion/styled').StyledComponent<import('@mui/material').ListItemIconProps & import('@mui/system').MUIStyledCommonProps<import('@mui/material').Theme>, {}, {}>;
export declare const CheckboxStyled: import('@emotion/styled').StyledComponent<import('@mui/material').CheckboxProps & import('@mui/system').MUIStyledCommonProps<import('@mui/material').Theme>, {}, {}>;
interface LayerListItemVectorLayerProps {
    id: string;
    configurable?: boolean;
    vtProps: MlVectorTileLayerProps;
    setVtProps: ((state: unknown) => void) | undefined;
    visibleMaster?: boolean;
}
declare function LayerListItemVectorLayer({ configurable, vtProps, setVtProps, id, ...props }: LayerListItemVectorLayerProps): import("react/jsx-runtime").JSX.Element;
declare namespace LayerListItemVectorLayer {
    var defaultProps: {
        configurable: boolean;
    };
}
export default LayerListItemVectorLayer;
//# sourceMappingURL=LayerListItemVectorLayer.d.ts.map
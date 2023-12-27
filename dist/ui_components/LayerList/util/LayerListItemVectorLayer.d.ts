import React from 'react';
import { MlVectorTileLayerProps } from '../../../components/MlVectorTileLayer/MlVectorTileLayer';
export declare const ListItemStyled: import("@emotion/styled").StyledComponent<{
    button?: false | undefined;
} & import("@mui/material").ListItemBaseProps & {
    components?: {
        Root?: React.ElementType<any> | undefined;
    } | undefined;
    componentsProps?: {
        root?: (React.HTMLAttributes<HTMLDivElement> & import("@mui/material").ListItemComponentsPropsOverrides) | undefined;
    } | undefined;
    slotProps?: {
        root?: (React.HTMLAttributes<HTMLDivElement> & import("@mui/material").ListItemComponentsPropsOverrides) | undefined;
    } | undefined;
    slots?: {
        root?: React.ElementType<any> | undefined;
    } | undefined;
} & import("@mui/material/OverridableComponent").CommonProps & Omit<Pick<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "key" | keyof React.LiHTMLAttributes<HTMLLIElement>> & {
    ref?: ((instance: HTMLLIElement | null) => void) | React.RefObject<HTMLLIElement> | null | undefined;
}, "className" | "style" | "classes" | "button" | "children" | "disabled" | "sx" | "alignItems" | "autoFocus" | "ContainerComponent" | "ContainerProps" | "dense" | "disableGutters" | "disablePadding" | "divider" | "secondaryAction" | "selected" | "components" | "componentsProps" | "slotProps" | "slots"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export declare const CheckboxListItemIcon: import("@emotion/styled").StyledComponent<import("@mui/material").ListItemIconProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export declare const CheckboxStyled: import("@emotion/styled").StyledComponent<import("@mui/material").CheckboxProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
interface LayerListItemVectorLayerProps {
    id: string;
    configurable?: boolean;
    vtProps: MlVectorTileLayerProps;
    setVtProps: ((state: unknown) => void) | undefined;
    visibleMaster?: boolean;
}
declare function LayerListItemVectorLayer({ configurable, vtProps, setVtProps, id, ...props }: LayerListItemVectorLayerProps): JSX.Element;
declare namespace LayerListItemVectorLayer {
    var defaultProps: {
        configurable: boolean;
    };
}
export default LayerListItemVectorLayer;

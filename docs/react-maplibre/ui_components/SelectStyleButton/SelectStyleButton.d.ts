import { SxProps } from '@mui/material';
import { StyleSpecification } from 'maplibre-gl';
export interface SelectStyleButtonProps {
    sx?: SxProps;
    onComplete?: (config: StyleSpecification[]) => void;
    styles?: StyleSpecification[];
    defaultStyles?: boolean;
    styleThumbnailPaths?: {
        [key: string]: string;
    };
}
declare const SelectStyleButton: ({ sx, styles, defaultStyles, styleThumbnailPaths, }: SelectStyleButtonProps) => import("react/jsx-runtime").JSX.Element;
export default SelectStyleButton;
//# sourceMappingURL=SelectStyleButton.d.ts.map
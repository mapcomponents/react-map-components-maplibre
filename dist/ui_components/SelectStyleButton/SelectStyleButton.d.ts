/// <reference types="react" />
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
declare const SelectStyleButton: {
    (props: SelectStyleButtonProps): JSX.Element;
    defaultProps: {
        style: never[];
        defaultStyles: boolean;
    };
};
export default SelectStyleButton;

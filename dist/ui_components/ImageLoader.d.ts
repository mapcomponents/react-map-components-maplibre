/// <reference types="react" />
import { SxProps } from '@mui/material';
interface ImageLoaderProps {
    src: string;
    alt?: string;
    sx?: SxProps;
    className?: string;
}
declare const ImageLoader: (props: ImageLoaderProps) => JSX.Element;
export default ImageLoader;

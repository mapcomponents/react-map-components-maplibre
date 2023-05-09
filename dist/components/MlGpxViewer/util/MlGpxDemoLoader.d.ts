interface MlGpxDemoLoaderProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setGpx: (gpx: string | ArrayBuffer) => void;
}
/**
 * MlGpxDemoLoader returns a button to load a Demo GPX Track into the map.
 */
declare const MlGpxDemoLoader: (props: MlGpxDemoLoaderProps) => JSX.Element;
export default MlGpxDemoLoader;

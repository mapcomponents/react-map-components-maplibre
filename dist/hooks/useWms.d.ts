export default useWms;
declare function useWms(props: any): {
    capabilities: undefined;
    getFeatureInfoUrl: undefined;
    wmsUrl: string;
    error: undefined;
    setUrl: import("react").Dispatch<any>;
};
declare namespace useWms {
    namespace defaultProps {
        const url: string;
        namespace urlParameters {
            const SERVICE: string;
            const VERSION: string;
            const REQUEST: string;
        }
    }
}

import { WMSCapabilitiesJSON } from 'wms-capabilities';
export interface useWmsProps {
    url?: string;
    urlParameters?: {
        [key: string]: string;
    };
}
export interface useWmsReturnType {
    capabilities: WMSCapabilitiesJSON | null | undefined;
    getFeatureInfoUrl: string | undefined;
    wmsUrl: string | undefined;
    error: string | undefined;
    setUrl: (value: string | undefined) => void;
}
declare function useWms(props: useWmsProps): useWmsReturnType;
declare namespace useWms {
    var defaultProps: {
        url: string;
        urlParameters: {
            SERVICE: string;
            VERSION: string;
            REQUEST: string;
        };
    };
}
export default useWms;
//# sourceMappingURL=useWms.d.ts.map
import { AddProtocolAction } from 'maplibre-gl';
export interface useAddProtocolProps {
    /**
     * the protocol string, for example `mbtiles`
     * In this example the handler function is called for all tile requests that start with the string `mbtiles://`
     */
    protocol: string;
    /**
     * Custom load tile function that will be called when using a source that starts with a custom url schema.
     */
    handler: AddProtocolAction;
}
/**
 * Enables the use of custom protocols (basically custom tile load functions) in the maplibre-gl-js library.
 *
 */
declare const useAddProtocol: {
    (props: useAddProtocolProps): {};
    defaultProps: {
        mapId: undefined;
    };
};
export default useAddProtocol;
//# sourceMappingURL=useAddProtocol.d.ts.map
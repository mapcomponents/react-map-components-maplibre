import { RequestParameters, ResponseCallback } from 'maplibre-gl';
declare const parseTileParams: (url: string) => {
    filename: string;
    z: string;
    x: string;
    y: string;
};
declare const getMbtilesDbHandler: ({ filename }: {
    filename: string;
}) => Promise<any>;
/**
 * Example usage:
 * getBufferFromMbtiles({ filename: 'mbtiles/countries.mbtiles', z: '0', x: '0', y: '0' }).then(
 * 	(result) => {
 * 		console.log(result);
 * 	}
 * );
 */
declare function getBufferFromMbtiles(params: {
    filename: string;
    z: string;
    x: string;
    y: string;
}): Promise<unknown>;
/**
 * Expects a tile url in the following format:
 *
 * 'mbtiles://mbtiles/countries.mbtiles/{z}/{x}/{y}'
 */
declare const mbTilesProtocolHandler: (params: RequestParameters, callback: ResponseCallback<any>) => {
    cancel: () => void;
};
export { mbTilesProtocolHandler, parseTileParams, getBufferFromMbtiles, getMbtilesDbHandler };

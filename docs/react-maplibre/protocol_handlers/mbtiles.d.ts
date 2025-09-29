import { default as initSqlJs } from 'sql.js';
import { RequestParameters } from 'maplibre-gl';
declare const parseTileParams: (url: string) => {
    filename: string;
    z: string;
    x: string;
    y: string;
};
declare const getMbtilesDbHandler: ({ filename }: {
    filename: string;
}) => Promise<{
    close(): void;
    create_function(name: string, func: (...args: any[]) => any): /*elided*/ any;
    each(sql: string, params: initSqlJs.BindParams, callback: initSqlJs.ParamsCallback, done: () => void): /*elided*/ any;
    each(sql: string, callback: initSqlJs.ParamsCallback, done: () => void): /*elided*/ any;
    exec(sql: string, params?: initSqlJs.BindParams): initSqlJs.QueryExecResult[];
    export(): Uint8Array;
    getRowsModified(): number;
    handleError(): null | never;
    iterateStatements(sql: string): {
        getRemainingSQL(): string;
        next(): initSqlJs.StatementIteratorResult;
        [Symbol.iterator](): Iterator<{
            bind(values?: initSqlJs.BindParams): boolean;
            free(): boolean;
            freemem(): void;
            get(params?: initSqlJs.BindParams): initSqlJs.SqlValue[];
            getAsObject(params?: initSqlJs.BindParams): initSqlJs.ParamsObject;
            getColumnNames(): string[];
            getNormalizedSQL(): string;
            getSQL(): string;
            reset(): void;
            run(values?: initSqlJs.BindParams): void;
            step(): boolean;
        }>;
    };
    prepare(sql: string, params?: initSqlJs.BindParams): {
        bind(values?: initSqlJs.BindParams): boolean;
        free(): boolean;
        freemem(): void;
        get(params?: initSqlJs.BindParams): initSqlJs.SqlValue[];
        getAsObject(params?: initSqlJs.BindParams): initSqlJs.ParamsObject;
        getColumnNames(): string[];
        getNormalizedSQL(): string;
        getSQL(): string;
        reset(): void;
        run(values?: initSqlJs.BindParams): void;
        step(): boolean;
    };
    run(sql: string, params?: initSqlJs.BindParams): /*elided*/ any;
}>;
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
declare const mbTilesProtocolHandler: (params: RequestParameters) => Promise<{
    data: {};
}>;
export { mbTilesProtocolHandler, parseTileParams, getBufferFromMbtiles, getMbtilesDbHandler };
//# sourceMappingURL=mbtiles.d.ts.map
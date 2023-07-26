
declare module 'csv2geojson' {
    export interface csvOptions {
        'latfield'?: string,
        'lonfield'?: string,
        'delimiter'?: string
    }

    export function csv2geojson(
        csvString: string,
        options: csvOptions,
        callback: (err: string, data: FeatureCollection) => void
    ): void
}
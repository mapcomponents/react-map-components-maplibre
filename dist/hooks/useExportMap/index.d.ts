import { createExportOptions } from './lib';
interface exportMapProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
}
export default function useExportMap(props: exportMapProps): {
    createExport: ((options: Omit<createExportOptions, 'map'> & Partial<Pick<createExportOptions, 'map'>>) => Promise<import("./lib").createExportResolverParams>) | undefined;
};
export {};

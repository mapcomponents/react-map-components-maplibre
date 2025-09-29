import { default as React } from '../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
export interface SimpleDataProviderProps {
    url: string;
    format: 'json' | 'csv' | 'xml';
    nodeType: string;
    data_property: string;
    formatData?: (data: any) => any;
    onData: () => void;
    children: React.ReactNode;
}
declare const SimpleDataProvider: (props: SimpleDataProviderProps) => import("react/jsx-runtime").JSX.Element;
export default SimpleDataProvider;
//# sourceMappingURL=SimpleDataProvider.d.ts.map
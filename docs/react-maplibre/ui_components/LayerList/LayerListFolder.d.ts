import { default as React, ReactNode } from '../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
interface LayerListFolderProps {
    visible: boolean;
    name?: string | ReactNode;
    children: React.JSX.Element | React.JSX.Element[];
    setVisible?: (visible: boolean | ((val: unknown) => boolean)) => void;
}
declare function LayerListFolder({ visible, name, children, setVisible }: LayerListFolderProps): import("react/jsx-runtime").JSX.Element;
export default LayerListFolder;
//# sourceMappingURL=LayerListFolder.d.ts.map
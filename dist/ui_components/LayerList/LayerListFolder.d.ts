/// <reference types="react" />
interface LayerListFolderProps {
    visible: boolean;
    name?: string;
    children: JSX.Element | JSX.Element[];
    setVisible?: (visible: boolean | ((val: unknown) => boolean)) => void;
}
declare function LayerListFolder({ visible, name, children, setVisible }: LayerListFolderProps): JSX.Element;
export default LayerListFolder;

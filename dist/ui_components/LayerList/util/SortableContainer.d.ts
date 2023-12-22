import { ReactNode } from 'react';
interface SortableContainerProps {
    children: ReactNode;
    layerId: string;
}
declare function SortableContainer({ children, layerId }: SortableContainerProps): JSX.Element;
export default SortableContainer;

import * as React from 'react';
export interface TopToolbarProps {
    children?: React.ReactNode;
    unmovableButtons?: React.ReactNode;
    buttons?: React.ReactNode;
    logo?: React.ReactNode;
}
declare function TopToolbar(props: TopToolbarProps): JSX.Element;
export default TopToolbar;

import { default as React } from '../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
import { PaperProps, DrawerProps } from '@mui/material';
interface SidebarProps {
    drawerPaperProps?: PaperProps;
    drawerHeaderProps?: Headers;
    children?: React.ReactNode;
    open?: boolean;
    setOpen?: (val: boolean) => void;
    name?: string;
    drawerBleeding?: number;
}
export default function Sidebar({ drawerPaperProps, drawerHeaderProps, setOpen, ...props }: SidebarProps & DrawerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Sidebar.d.ts.map
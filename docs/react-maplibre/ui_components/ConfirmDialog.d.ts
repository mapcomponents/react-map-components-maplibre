export interface ConfirmDialogProps {
    open: boolean;
    title: string;
    text: string;
    onConfirm: () => void;
    onCancel: () => void;
}
declare function ConfirmDialog(props: ConfirmDialogProps): import("react/jsx-runtime").JSX.Element;
declare namespace ConfirmDialog {
    var defaultProps: {
        title: string;
        text: string;
    };
}
export default ConfirmDialog;
//# sourceMappingURL=ConfirmDialog.d.ts.map
/// <reference types="react" />
export interface ConfirmDialogProps {
    open: boolean;
    title: string;
    text: string;
    onConfirm: () => void;
    onCancel: () => void;
}
declare function ConfirmDialog(props: ConfirmDialogProps): JSX.Element;
declare namespace ConfirmDialog {
    var defaultProps: {
        title: string;
        text: string;
    };
}
export default ConfirmDialog;

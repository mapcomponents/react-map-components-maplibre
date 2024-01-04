/// <reference types="react" />
type Props = {
    setData: (data: string) => void;
    buttonComponent: any;
    accept?: string;
};
export default function UploadButton(props: Props): JSX.Element;
export {};

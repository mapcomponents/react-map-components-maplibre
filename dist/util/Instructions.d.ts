/// <reference types="react" />
import { SxProps } from '@mui/material';
interface StepObject {
    duration: number;
    props: SxProps;
    content: JSX.Element;
}
interface InstructionProps {
    steps: Array<StepObject>;
    open: boolean;
    callback?: () => void;
}
declare const Instructions: (props: InstructionProps) => JSX.Element;
export default Instructions;

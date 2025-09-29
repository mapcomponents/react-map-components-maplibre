import { SxProps } from '@mui/material';
import { JSX } from '../../../../node_modules/.pnpm/react@19.1.0/node_modules/react/jsx-runtime';
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
//# sourceMappingURL=Instructions.d.ts.map
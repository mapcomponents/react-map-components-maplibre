import { default as React } from '../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
import { BubbleForInstructionProps } from './BubbleForInstructions';
export interface StepObject {
    duration: number;
    props: BubbleForInstructionProps;
    content: React.JSX.Element;
}
export interface InstructionProps {
    steps: StepObject[];
    open: boolean;
    callback?: () => void;
}
declare const Instructions: (props: InstructionProps) => import("react/jsx-runtime").JSX.Element;
export default Instructions;
//# sourceMappingURL=Instructions.d.ts.map
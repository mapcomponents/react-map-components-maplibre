import React from 'react';
import { PdfContextInterface } from './pdfContext';
declare const PdfContext: React.Context<PdfContextInterface>;
declare const PdfContextProvider: ({ children }: {
    children: React.ReactNode;
}) => JSX.Element;
export { PdfContextProvider };
export default PdfContext;

interface PdfTemplateType {
    width: number;
    height: number;
}
interface PdfTemplateObject {
    [key: string]: {
        [key: string]: PdfTemplateType;
    };
}
declare const PdfTemplates: PdfTemplateObject;
export default PdfTemplates;
//# sourceMappingURL=pdf.templates.d.ts.map
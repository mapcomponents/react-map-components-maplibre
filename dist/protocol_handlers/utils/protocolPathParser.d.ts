export default function protocolPathParser(url: string): {
    protocolId: string;
    filename: string;
    options: {
        [k: string]: string;
    };
};

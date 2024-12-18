export var uuid_regex: string;
export namespace mockMapLibreMethods {
    const on: jest.Mock<any, any, any>;
    const off: jest.Mock<any, any, any>;
    const addControl: jest.Mock<any, any, any>;
    const removeControl: jest.Mock<any, any, any>;
    const fitBounds: jest.Mock<any, any, any>;
    const hasControl: jest.Mock<boolean, [], any>;
    function getCanvas(): HTMLCanvasElement;
    function getContainer(): {
        style: {};
    };
}

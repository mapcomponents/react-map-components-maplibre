export const uuid_regex: "[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}";
export namespace mockMapLibreMethods {
    let on: jest.Mock<any, any, any>;
    let off: jest.Mock<any, any, any>;
    let addControl: jest.Mock<any, any, any>;
    let removeControl: jest.Mock<any, any, any>;
    let fitBounds: jest.Mock<any, any, any>;
    let hasControl: jest.Mock<boolean, [], any>;
    function getCanvas(): HTMLCanvasElement;
    function getContainer(): {
        style: {};
    };
}
//# sourceMappingURL=setupTests.d.ts.map
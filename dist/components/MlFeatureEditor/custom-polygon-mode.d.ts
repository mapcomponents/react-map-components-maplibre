export default CustomPolygonMode;
declare namespace CustomPolygonMode {
    function onSetup(): {
        polygon: any;
        currentVertexPosition: number;
    };
    function clickAnywhere(state: any, e: any): any;
    function clickOnVertex(state: any): any;
    function onMouseMove(state: any, e: any): void;
    function onTap(state: any, e: any): any;
    function onClick(state: any, e: any): any;
    function onKeyUp(state: any, e: any): void;
    function onStop(state: any): void;
    function toDisplayFeatures(state: any, geojson: any, display: any): any;
    function onTrash(state: any): void;
}

export default DirectSelect;
declare namespace DirectSelect {
    function fireUpdate(): void;
    function fireActionable(state: any): void;
    function startDragging(state: any, e: any): void;
    function stopDragging(state: any): void;
    function onVertex(state: any, e: any): void;
    function onMidpoint(state: any, e: any): void;
    function pathsToCoordinates(featureId: any, paths: any): any;
    function onFeature(state: any, e: any): void;
    function dragFeature(state: any, e: any, delta: any): void;
    function dragVertex(state: any, e: any, delta: any): void;
    function clickNoTarget(): void;
    function clickInactive(): void;
    function clickActiveFeature(state: any): void;
    function onSetup(opts: any): {
        featureId: any;
        feature: any;
        dragMoveLocation: any;
        dragMoving: boolean;
        canDragMove: boolean;
        selectedCoordPaths: any[];
        groupMove_vertices: any;
    };
    function onStop(): void;
    function toDisplayFeatures(state: any, geojson: any, push: any): void;
    function onTrash(state: any): void;
    function onMouseMove(state: any, e: any): void;
    function onMouseOut(state: any): void;
    function onTouchStart(state: any, e: any): void;
    function onMouseDown(state: any, e: any): void;
    function onDrag(state: any, e: any): void;
    function onClick(state: any, e: any): void;
    function onTap(state: any, e: any): void;
    function onTouchEnd(state: any): void;
    function onMouseUp(state: any): void;
}

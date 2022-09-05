export default CustomSelectMode;
declare namespace CustomSelectMode {
    function onSetup(opts: any): {
        dragMoveLocation: null;
        boxSelectStartLocation: null;
        boxSelectElement: undefined;
        boxSelecting: boolean;
        canBoxSelect: boolean;
        dragMoving: boolean;
        canDragMove: boolean;
        initiallySelectedFeatureIds: any;
    };
    function fireUpdate(): void;
    function fireActionable(): void;
    function getUniqueIds(allFeatures: any): any;
    function stopExtendedInteractions(state: any): void;
    function onStop(): void;
    function onMouseMove(state: any): void;
    function onMouseOut(state: any): void;
    function onTap(state: any, e: any): any;
    function onClick(state: any, e: any): any;
    function clickAnywhere(state: any): void;
    function clickOnVertex(state: any, e: any): void;
    function startOnActiveFeature(state: any, e: any): void;
    function clickOnFeature(state: any, e: any): any;
    function onMouseDown(state: any, e: any): void;
    function startBoxSelect(state: any, e: any): void;
    function onTouchStart(state: any, e: any): void;
    function onDrag(state: any, e: any): void;
    function whileBoxSelect(state: any, e: any): void;
    function dragMove(state: any, e: any): void;
    function onMouseUp(state: any, e: any): void;
    function toDisplayFeatures(state: any, geojson: any, display: any): void;
    function onTrash(): void;
    function onCombineFeatures(): void;
    function onUncombineFeatures(): void;
}

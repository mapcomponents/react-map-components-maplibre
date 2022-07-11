export default ModeHandler;
/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
declare function ModeHandler(mode: any, DrawContext: any): {
    render: any;
    stop(): void;
    trash(): void;
    combineFeatures(): void;
    uncombineFeatures(): void;
    drag(event: any): void;
    click(event: any): void;
    mousemove(event: any): void;
    mousedown(event: any): void;
    mouseup(event: any): void;
    mouseout(event: any): void;
    keydown(event: any): void;
    keyup(event: any): void;
    touchstart(event: any): void;
    touchmove(event: any): void;
    touchend(event: any): void;
    tap(event: any): void;
};

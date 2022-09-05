export namespace classes {
    const CONTROL_BASE: string;
    const CONTROL_PREFIX: string;
    const CONTROL_BUTTON: string;
    const CONTROL_BUTTON_LINE: string;
    const CONTROL_BUTTON_POLYGON: string;
    const CONTROL_BUTTON_POINT: string;
    const CONTROL_BUTTON_TRASH: string;
    const CONTROL_BUTTON_COMBINE_FEATURES: string;
    const CONTROL_BUTTON_UNCOMBINE_FEATURES: string;
    const CONTROL_GROUP: string;
    const ATTRIBUTION: string;
    const ACTIVE_BUTTON: string;
    const BOX_SELECT: string;
}
export namespace sources {
    const HOT: string;
    const COLD: string;
}
export namespace cursors {
    const ADD: string;
    const MOVE: string;
    const DRAG: string;
    const POINTER: string;
    const NONE: string;
}
export namespace types {
    const POLYGON: string;
    const LINE: string;
    const POINT: string;
}
export namespace geojsonTypes {
    export const FEATURE: string;
    const POLYGON_1: string;
    export { POLYGON_1 as POLYGON };
    export const LINE_STRING: string;
    const POINT_1: string;
    export { POINT_1 as POINT };
    export const FEATURE_COLLECTION: string;
    export const MULTI_PREFIX: string;
    export const MULTI_POINT: string;
    export const MULTI_LINE_STRING: string;
    export const MULTI_POLYGON: string;
}
export namespace modes {
    const DRAW_LINE_STRING: string;
    const DRAW_POLYGON: string;
    const DRAW_POINT: string;
    const SIMPLE_SELECT: string;
    const DIRECT_SELECT: string;
    const STATIC: string;
}
export namespace events {
    const CREATE: string;
    const DELETE: string;
    const UPDATE: string;
    const SELECTION_CHANGE: string;
    const MODE_CHANGE: string;
    const ACTIONABLE: string;
    const RENDER: string;
    const COMBINE_FEATURES: string;
    const UNCOMBINE_FEATURES: string;
}
export namespace updateActions {
    const MOVE_1: string;
    export { MOVE_1 as MOVE };
    export const CHANGE_COORDINATES: string;
}
export namespace meta {
    const FEATURE_1: string;
    export { FEATURE_1 as FEATURE };
    export const MIDPOINT: string;
    export const VERTEX: string;
}
export namespace activeStates {
    const ACTIVE: string;
    const INACTIVE: string;
}
export const interactions: string[];
export const LAT_MIN: -90;
export const LAT_RENDERED_MIN: -85;
export const LAT_MAX: 90;
export const LAT_RENDERED_MAX: 85;
export const LNG_MIN: -270;
export const LNG_MAX: 270;

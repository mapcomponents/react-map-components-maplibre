export default storyoptions;
export const useGeojsonSourceExample: any;
export const useVectorSourceExample: any;
export const useRasterSourceExample: any;
export const removeSourceExample: any;
declare namespace storyoptions {
    export const title: string;
    export { useSource as component };
    export const argTypes: {};
    export { mapContextDecoratorHooks as decorators };
}
import useSource from "./useSource";
import mapContextDecoratorHooks from "../decorators/MapContextDecoratorHooks";

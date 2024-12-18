export default storyoptions;
export const ExampleConfig: any;
export const StyleChangeConfig: any;
declare namespace storyoptions {
    export const title: string;
    export { MapLibreMap as component };
    export namespace argTypes {
        namespace options {
            namespace control {
                const type: string;
            }
        }
    }
    export { themeDecorator as decorators };
    export namespace parameters {
        const sourceLink: string;
    }
}
import MapLibreMap from "./MapLibreMap";
import themeDecorator from "../../decorators/ThemeDecorator";

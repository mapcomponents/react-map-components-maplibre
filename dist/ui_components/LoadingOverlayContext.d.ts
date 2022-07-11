export const LoadingOverlayContext: React.Context<{}>;
export function LoadingOverlayProvider({ children }: {
    children: any;
}): JSX.Element;
export namespace LoadingOverlayProvider {
    namespace propTypes {
        const children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    }
}
import React from "react";
import PropTypes from "prop-types";

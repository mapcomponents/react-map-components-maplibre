export default SimpleDataProvider;
declare function SimpleDataProvider(props: any): JSX.Element;
declare namespace SimpleDataProvider {
    namespace propTypes {
        const children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    }
}
import PropTypes from "prop-types";

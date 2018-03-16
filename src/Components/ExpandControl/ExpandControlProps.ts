import * as PropTypes from "prop-types";

export interface ExpandControlProps extends React.HTMLProps<HTMLButtonElement> {
    ref?: any; // https://github.com/Microsoft/TypeScript/issues/16019
    expandId: string;
    staticState?: boolean;
    activeOnMount?: boolean;
    activeClassName?: string;
    triggerEvent?: "hover" | "click";
}

export const ExpandControlPropTypes: {[T in keyof ExpandControlProps]: PropTypes.Validator<any>} = {
    staticState: PropTypes.bool,
    activeOnMount: PropTypes.bool,
    activeClassName: PropTypes.string,
    expandId: PropTypes.string.isRequired,
    triggerEvent: PropTypes.oneOf(["hover", "click"])
};

export const ExpandControlDefaultProps: {[T in keyof ExpandControlProps]?: ExpandControlProps[T]} = {
    activeClassName: "active-control",
    triggerEvent: "click"
};

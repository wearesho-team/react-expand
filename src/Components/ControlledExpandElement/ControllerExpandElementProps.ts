import * as PropTypes from "prop-types";

export interface ControlledExpandElementProps extends React.HTMLProps<HTMLDivElement> {
    ref?: any; // https://github.com/Microsoft/TypeScript/issues/16019
    expandId: string;
    activeClassName?: string;
}

export const ControlledExpandElementPropTypes: {[P in keyof ControlledExpandElementProps]: PropTypes.Validator<any>} = {
    expandId: PropTypes.string.isRequired,
    activeClassName: PropTypes.string
};

export const ControlledExpandElementDefaultProps:
    {[P in keyof ControlledExpandElementProps]?: ControlledExpandElementProps[P]}
    = {
        activeClassName: "active-element"
    };

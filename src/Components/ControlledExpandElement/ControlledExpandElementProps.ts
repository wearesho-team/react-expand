import * as PropTypes from "prop-types";

export interface ControlledExpandElementProps extends React.HTMLProps<HTMLDivElement> {
    ref?: any; // https://github.com/Microsoft/TypeScript/issues/16019
    expandId: string;
    closeOnOutside?: boolean;
    animationTimeout?: number;
}

export const ControlledExpandElementPropTypes:
    {[P in keyof ControlledExpandElementProps]: PropTypes.Validator<any>} = {
        expandId: PropTypes.string.isRequired,
        animationTimeout: PropTypes.number,
        closeOnOutside: PropTypes.bool,
    };

export const ControlledExpandElementDefaultProps:
    {[P in keyof ControlledExpandElementProps]?: ControlledExpandElementProps[P]} = {
        animationTimeout: 0
    };

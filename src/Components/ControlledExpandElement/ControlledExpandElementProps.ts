import * as PropTypes from "prop-types";

import { TransitionChildProps, TransitionChildPropTypes, TransitionChildDefaultProps } from "../Transition";

export interface ControlledExpandElementProps extends React.HTMLProps<HTMLDivElement>, TransitionChildProps {
    ref?: any; // https://github.com/Microsoft/TypeScript/issues/16019
    expandId: string;
    closeOnOutside?: boolean;
}

export const ControlledExpandElementPropTypes:
    {[P in keyof ControlledExpandElementProps]: PropTypes.Validator<any>} = {
        expandId: PropTypes.string.isRequired,
        closeOnOutside: PropTypes.bool,
        ...TransitionChildPropTypes
    };

export const ControlledExpandElementDefaultProps:
    {[P in keyof ControlledExpandElementProps]?: ControlledExpandElementProps[P]} = {
        ...TransitionChildDefaultProps
    };

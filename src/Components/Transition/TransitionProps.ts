import * as PropTypes from "prop-types";

export interface TransitionProps extends React.HTMLProps<HTMLDivElement> {
    timeout: number;
    status: boolean;
}

export const TransitionPropTypes: {[P in keyof TransitionProps]: PropTypes.Validator<any>} = {
    timeout: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired
};

export interface TransitionChildProps {
    animationTimeout?: number;
}

export const TransitionChildPropTypes: {[P in keyof TransitionChildProps]: PropTypes.Validator<any>} = {
    animationTimeout: PropTypes.number
};

export const TransitionChildDefaultProps: {[P in keyof TransitionChildProps]?: TransitionChildProps[P]} = {
    animationTimeout: 0
};
